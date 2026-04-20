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
    getTotalAppointmentCount,
    getTotalPatientCount,
} from "../controllers/patientManagement.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";

router.get("/export", auth, roleMiddleware("Admin"), exportPatientsCSV);
router.get("/getPatientByAppointmentId/:appointmentId", auth, roleMiddleware("Admin", "Doctor", "FDO"), getPatientByAppointmentId);

router.post("/", auth, roleMiddleware("FDO","Admin"), createPatient);
router.get("/", auth, roleMiddleware("Admin", "FDO"), getAllPatients);

router.get("/:id", auth, roleMiddleware("FDO"), getPatientById);
router.put("/:id", auth, roleMiddleware("FDO","Admin"), updatePatient);
router.delete("/:id", auth, roleMiddleware("Admin"), deletePatient);
router.get("/appointmentCount/total", getTotalAppointmentCount);

router.get("/patientCount/total", getTotalPatientCount);



export default router;