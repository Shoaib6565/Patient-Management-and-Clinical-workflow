import express from "express";
const router = express.Router();
import {
     getAllUsers, createUser, getUserById, updateUser, deleteUser, resetPassword, getActiveDoctorCount
} from "../controllers/userManagement.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
export default router;

router.post("/", createUser);
router.get("/", auth, roleMiddleware("Admin"), getAllUsers);
router.get("/:id", auth, roleMiddleware("Admin"), getUserById);
router.put("/:id", auth, roleMiddleware("Admin"), updateUser);
router.delete("/:id", auth, roleMiddleware("Admin"), deleteUser);
router.post("/reset-password/:id", auth, roleMiddleware("Admin"), resetPassword);
router.get("/active-doctors/count", getActiveDoctorCount);