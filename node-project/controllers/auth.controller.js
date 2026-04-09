import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../models/index.js";
import { JWT_SECRET } from "../config/jwt.js";
const { User, Role, Permission } = db;

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Body:", req.body);
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: Role,
          as: "roles",
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
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.is_active) {
      return res.status(403).json({ message: "User account is inactive. Please contact support." });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ FORMAT FUNCTION (INSIDE CONTROLLER)
    const formatPermission = (str) =>
      str.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());

    // ✅ CLEAN RESPONSE
    const cleanUser = user.toJSON();

    cleanUser.roles = cleanUser.roles.map((role) => {
      return {
        id: role.id,
        name: role.name,
        permissions: role.permissions.map((p) =>
          formatPermission(p.name)
        ),
      };
    });

    return res.json({
      message: "Login successful",
      token,
      user: cleanUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// LOGOUT (STATELESS)
export const logout = async (req, res, next) => {
  try {
    return res.api.success(
      null,
      "Logged out successfully (client must delete token)"
    );
  } catch (err) {
    next(err);
  }
};

// GET CURRENT USER
export const getMe = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Role,
          attributes: ["slug"],
          include: {
            model: Permission,
            attributes: ["slug"]
          }
        },
        {
          model: Permission,
          attributes: ["slug"]
        }
      ]
    });

    if (!user) {
      return res.api.notFound("User session is no longer valid");
    }

    const roles = user.Roles ? user.Roles.map(r => r.slug) : [];
    const rolePerms = user.Roles
      ? user.Roles.flatMap(role => role.Permissions.map(p => p.slug))
      : [];

    return res.api.success({
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        name: `${user.first_name || ''} ${user.last_name || ''}`.trim(),
        roles,
        rolePerms,
      }
    }, "Current user profile retrieved");

  } catch (err) {
    next(err);
  }
};
