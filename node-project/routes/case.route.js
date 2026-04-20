import express from "express";
const router = express.Router();
import {
    getAll,
    getById,
    create,
    update,
    Delete,
    exportCasesCSV,
    getCaseCount
} from "../controllers/case.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

export default router;

router.post("/", auth, roleMiddleware("FDO", "Admin"), create);
router.get("/export", auth, roleMiddleware("Admin"), exportCasesCSV);
router.get("/count", getCaseCount);
router.get("/", auth, roleMiddleware("FDO", "Admin"), getAll);
router.get("/:id", roleMiddleware("FDO", "Admin"), auth, getById);
router.put("/:id", roleMiddleware("FDO", "Admin"), auth, update);
router.delete("/:id", roleMiddleware("Admin"), auth, Delete);

