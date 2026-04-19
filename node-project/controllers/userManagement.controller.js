import db from "../models/index.js";
const { User, UserRole,Role } = db;
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
            where: { deleted_at: null },
             include: [
                {
                    model: Role,
                    as: "roles",   // IMPORTANT (must match association)
                    attributes: ['id', 'name'],
                    through: { attributes: [] } // hides pivot table
                }
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve users"
        });
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, email, password, is_active, role_id } = req.body;


        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            is_active
        });
        if (role_id) {
            await UserRole.create({
                user_id: user.id,
                role_id: role_id
            });
        }

        return res.status(201).json({
            message: "User created successfully",
            data: user
        });

    } catch (error) {
        console.error(error);
        return res.api.error("Failed to create user");
    }
};


export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk({
            where: { id, deleted_at: null },
        });
        if (!user) {
            return res.api.error("User not found");
        }
        return res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: user
        });
    } catch (error) {
        return res.api.error("Failed to retrieve user");

    }
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, is_active } = req.body;

    const user = await User.findOne({
      where: {
        id,
        deleted_at: null
      }
    });

    if (!user) {
      return res.status(404).json({
        success:false,
        message:"User not found"
      });
    }

    await user.update({
      name,
      email,
      is_active
    });
    console.log(user);
    return res.status(200).json({
      success:true,
      message:"Updated successfully",
      data:user
    });

  } catch(error) {
    console.error(error);

    return res.status(500).json({
      success:false,
      message:"Update failed"
    });
  }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.api.notFound("User not found");
        }

        await user.destroy();

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (error) {
        return res.api.error("Failed to delete user");
    }
};


export const resetPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { new_password } = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            return res.api.notFound("User not found");
        }
        const hashedPassword = await bcrypt.hash(new_password, 10);
        await user.update({ password: hashedPassword });
        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
    }
    catch (error) {
        return res.api.error("Failed to reset password");
    }
};


export const getActiveDoctorCount = async (req, res) => {
    try {
        const count = await UserRole.count({
            where: {
                role_id: 2
            },
            include: [
                {
                    model: User,
                    where: {
                        is_active: true,
                        deleted_at: null
                    }
                }
            ]
        });
        console.log("COUNT RESULT:", count);

        return res.status(200).json({
            success: true,
            message: "Active doctor count retrieved successfully",
            data: { count }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to get active doctor count",
            error: error.message
        });
    }
};