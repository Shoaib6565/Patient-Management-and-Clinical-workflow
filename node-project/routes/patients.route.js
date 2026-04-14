import express from "express";
const router = express.Router();

import {
    getAllPatients,
    createPatient,
    getPatientById,
    updatePatient,
    deletePatient,
    exportPatientsCSV,
    getPatientByAppointmentId,
    recoverDeletedPatient
} from "../controllers/patientManagement.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";

// IMPORTANT: specific routes first
router.get("/export", auth, roleMiddleware(["admin"]), exportPatientsCSV);
router.get("/getPatientByAppointmentId/:appointmentId", auth, roleMiddleware(["admin", "doctor", "FDO"]), getPatientByAppointmentId);

router.post("/", auth, roleMiddleware(["FDO"]), createPatient);
router.get("/", auth, roleMiddleware(["admin", "FDO"]), getAllPatients);

router.get("/:id", auth, roleMiddleware(["FDO"]), getPatientById);
router.put("/:id", auth, roleMiddleware(["FDO"]), updatePatient);
router.delete("/:id", auth, roleMiddleware(["admin"]), deletePatient);
router.post("/restore/:id", auth, roleMiddleware(["admin"]), recoverDeletedPatient);

export default router;