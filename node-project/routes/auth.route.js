import express from "express";
const router = express.Router();

import {
    login,
    logout,
    getMe
} from "../controllers/auth.controller.js";

import { auth } from "../middlewares/auth.middleware.js";

router.post("/login", login);
router.post("/logout", auth, logout);
router.get("/me", auth, getMe);

export default router;