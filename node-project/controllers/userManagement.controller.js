import { User } from "../models/index.js";
import bcrypt from 'bcryptjs';
 
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        return res.api.success("Users retrieved successfully", users);
    } catch (error) {
        return res.api.error();
    }
};
 
const createUser = async (req, res) => {
    try {
        const { name, email, password,is_active, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, is_active, role });
        return res.api.created(user, "User created successfully");
    } catch (error) {
        console.error("Error creating user:", error);
        return res.api.error("Failed to create user");
    }
};
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.api.error("User not found");
        }
        return res.api.success("User retrieved successfully", user);
    } catch (error) {
        return res.api.error("Failed to retrieve user");
 
    }
};
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {name, email,is_active, role } = req.body;
 
        const user = await User.findByPk(id);
        if (!user) {
            return res.api.notFound("User not found");
        }
        await user.update({ name, email, password: hashedPassword, is_active, role });
        return res.api.success("User updated successfully", user);
    } catch (error) {
        return res.api.error("Failed to update user");
    }
};
 
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.api.notFound("User not found");
        }
        await user.destroy();
        return res.api.success("User deleted successfully");
    } catch (error) {
        return res.api.error("Failed to delete user");
    }
}
 

export const resetPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
        return res.api.notFound("User not found");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });
    return res.api.success("Password reset successfully");
  }
    catch (error) {
        return res.api.error("Failed to reset password");
    }
};

export { getAllUsers, createUser, getUserById, updateUser, deleteUser, resetPassword };