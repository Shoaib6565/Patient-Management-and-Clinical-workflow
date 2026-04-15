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
    getTotalAppointmentCount
} from "../controllers/patientManagement.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";

router.get("/export", auth, roleMiddleware(["admin"]), exportPatientsCSV);
router.get("/getPatientByAppointmentId/:appointmentId", auth, roleMiddleware(["admin", "doctor", "FDO"]), getPatientByAppointmentId);

router.post("/", auth, roleMiddleware(["FDO"]), createPatient);
router.get("/", auth, roleMiddleware(["admin", "FDO"]), getAllPatients);

router.get("/:id", auth, roleMiddleware(["FDO"]), getPatientById);
router.put("/:id", auth, roleMiddleware(["FDO"]), updatePatient);
router.delete("/:id", auth, roleMiddleware(["admin"]), deletePatient);
router.get("/appointmentCount/total", auth, roleMiddleware(["admin"]), getTotalAppointmentCount);



export default router;