import express from "express";
const router = express.Router();
import {
    getAll,
    getById,
    create,
    update,
    Delete,
    exportCasesCSV
} from "../controllers/case.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
export default router;

router.post("/", auth, create);
router.get("/", auth, getAll);
router.get("/:id", auth, getById);
router.put("/:id", auth, update);
router.delete("/:id", auth, Delete);
router.get("/export", auth, exportCasesCSV);
