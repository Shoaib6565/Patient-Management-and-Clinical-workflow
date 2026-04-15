import express from "express";
const router = express.Router();
import {
     getAllUsers, createUser, getUserById, updateUser, deleteUser, resetPassword, getActiveDoctorCount
} from "../controllers/userManagement.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
export default router;

router.post("/", auth, createUser);
router.get("/", auth, roleMiddleware("admin"), getAllUsers);
router.get("/:id", auth, roleMiddleware("admin"), getUserById);
router.put("/:id", auth, roleMiddleware("admin"), updateUser);
router.delete("/:id", auth, roleMiddleware("admin"), deleteUser);
router.post("/reset-password/:id", auth, roleMiddleware("admin"), resetPassword);
router.get("/active-doctors/count", auth, roleMiddleware("admin"), getActiveDoctorCount);