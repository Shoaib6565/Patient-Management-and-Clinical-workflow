import db from "../models/index.js";
const { User, UserRole } = db;
import bcrypt from 'bcryptjs';

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();

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

const createUser = async (req, res) => {
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


const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
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
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, is_active, role } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.api.notFound("User not found");
        }

        const updatedData = {};

        if (name !== undefined) updatedData.name = name;
        if (email !== undefined) updatedData.email = email;
        if (is_active !== undefined) updatedData.is_active = is_active;
        if (role !== undefined) updatedData.role = role;

        await user.update(updatedData);

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user
        });
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

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (error) {
        return res.api.error("Failed to delete user");
    }
};

const restoreUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, { paranoid: false });
        if (!user) {
            return res.api.notFound("User not found");
        }
        await user.restore();
        return res.status(200).json({
            success: true,
            message: "User restored successfully",
            data: user
        });
    } catch (error) {
        return res.api.error("Failed to restore user");
    }
};
const resetPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            return res.api.notFound("User not found");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.update({ password: hashedPassword });
        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });
    }
    catch (error) {
        return res.api.error("Failed to reset password");
    }
};

export { getAllUsers, createUser, getUserById, updateUser, deleteUser, resetPassword, restoreUser };