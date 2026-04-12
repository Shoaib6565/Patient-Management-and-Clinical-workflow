import express from 'express';
const router = express.Router();
import {
    createPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient,
    getPatientByAppointmentId
} from "../controllers/patientManagement.controller.js";
import { auth } from "../middlewares/auth.middleware.js";


export default router;

router.post("/", auth, createPatient);
router.get("/", auth, getPatients);
router.get("/:id", auth, getPatientById);
router.get("getPatientByAppointmentId/:id", auth, getPatientByAppointmentId);
router.put("/:id", auth, updatePatient);
router.delete("/:id", auth, deletePatient);
