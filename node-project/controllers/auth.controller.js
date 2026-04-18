import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../models/index.js";
import { JWT_SECRET } from "../config/jwt.js";
import { redis } from "../config/redis.js";

const { User, Role, Permission, UserRole } = db;


export const login = async (req, res) => {
  const { email, password } = req.body || {};
  console.log("body:", req.body);
  try {

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    console.log(user.is_active);
    console.log(typeof user.is_active);

    if (!user.is_active) {
      return res.status(403).json({
        message: "Account disabled"
      });
    }


    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(401).json({
    //     message: "Invalid password",
    //   });
    // }

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch && user.password.startsWith('$2y$')) {
      const fixedHash = user.password.replace('$2y$', '$2b$');
      isMatch = await bcrypt.compare(password, fixedHash);
    }

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }




    // Fetch user roles for adding in token payload and then frontend can use it for role based access control
    const userRole = await UserRole.findOne({
      where: { user_id: user.id },
      include: [{ model: Role, attributes: ['name'] }]
    });
    const role = userRole?.Role?.name;

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: role
      },
      JWT_SECRET,
      { expiresIn: "30m" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
      },
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const logout = async (req, res) => {
  try {
    const token = req.token;

    const decoded = jwt.decode(token);

    if (!decoded?.exp) {
      return res.status(400).json({ message: "Invalid token structure" });
    }

    const ttl = decoded.exp - Math.floor(Date.now() / 1000);

    if (ttl > 0) {
      await redis.set(`bl:${token}`, "1", {
        EX: ttl,
      });
    }

    return res.json({ message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};



export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Role,
          as: "roles",
          attributes: ["id", "name"],
          through: { attributes: [] },
          include: [
            {
              model: Permission,
              as: "permissions",
              attributes: ["name"],
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }


    const cleanUser = user.toJSON();

    cleanUser.roles = cleanUser.roles.map((role) => {
      return {
        id: role.id,
        name: role.name,
        permissions: role.permissions.map((p) => p.name),
      };
    });

    return res.json({
      message: "Current user fetched successfully",
      user: cleanUser,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
