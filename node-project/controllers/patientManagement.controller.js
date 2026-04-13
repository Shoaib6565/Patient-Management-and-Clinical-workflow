import db from "../models/index.js";
import { Parser } from "json2csv";
import { Op } from "sequelize";

const { Patient, Case, Appointment, Visit } = db;
//get api seacrh and filter functionality , pagination limit 10, view all patients
export const getAllPatients = async (req, res) => {
    try {
        const {
            name,
            dob_from,
            dob_to,
            gender,
            ssn,
            patient_status,
            city,
            state,
            zip_code,
            reg_from,
            reg_to,
            page = 1,
            limit = 10,
        } = req.query;

        let where = {};
        const offset = (page - 1) * limit;

        if (name) {
            where[Op.or] = [
                { first_name: { [Op.like]: `%${name}%` } },
                { middle_name: { [Op.like]: `%${name}%` } },
                { last_name: { [Op.like]: `%${name}%` } }
            ];
        }

        if (dob_from || dob_to) {
            where.date_of_birth = {};
            if (dob_from) where.date_of_birth[Op.gte] = dob_from;
            if (dob_to) where.date_of_birth[Op.lte] = dob_to;
        }

        if (gender) where.gender = gender;
        if (ssn) where.ssn = { [Op.like]: `%${ssn}%` };
        if (patient_status) where.patient_status = patient_status;
        if (city) where.city = { [Op.like]: `%${city}%` };
        if (state) where.state = { [Op.like]: `%${state}%` };
        if (zip_code) where.zip_code = zip_code;

        if (reg_from || reg_to) {
            where.registration_date = {};
            if (reg_from) where.registration_date[Op.gte] = reg_from;
            if (reg_to) where.registration_date[Op.lte] = reg_to;
        }

        const { count, rows: allPatients } = await Patient.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']],
        });

        return res.status(200).json({
            message: "Patients retrieved successfully",
            data: {
                Patient: allPatients,
                pagination: {
                    totalItems: count,
                    totalPages: Math.ceil(count / limit),
                    currentPage: parseInt(page),
                    itemsPerPage: parseInt(limit),
                }
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to retrieve patients",
            error: error.message
        });
    }
};

export const createPatient = async (req, res) => {
    try {
        const { first_name, middle_name, last_name, date_of_birth, gender, ssn, email, phone, mobile, address, city, state, zip_code, country, emergency_contact_name, emergency_contact_phone, insurance_provider, insurance_policy_number, primary_physician, preferred_language, patient_status, registration_date, } = req.body;
        const newPatient = await Patient.create({ first_name, middle_name, last_name, date_of_birth, gender, ssn, email, phone, mobile, address, city, state, zip_code, country, emergency_contact_name, emergency_contact_phone, insurance_provider, insurance_policy_number, primary_physician, preferred_language, patient_status, registration_date });
        return res.status(201).json({
            message: "Patient created successfully",
            data: newPatient
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to create patient",
            error: error.message
        });
    }
};

export const getPatientById = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByPk(id);
        if (!patient) {
            return res.api.notFound("Patient not found");
        }
        return res.status(200).json({
            message: "Patient retrieved successfully",
            data: patient
        });
    }
    catch (error) {
        return res.api.error("Failed to retrieve patient");
    }
};

export const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, middle_name, last_name, date_of_birth, gender, ssn, email, phone, mobile, address, city, state, zip_code, country, emergency_contact_name, emergency_contact_phone, insurance_provider, insurance_policy_number, primary_physician, preferred_language, patient_status, registration_date, } = req.body;
        const patient = await Patient.findByPk(id);
        if (!patient) {
            return res.api.notFound("Patient not found");
        }
        await patient.update({
            first_name, middle_name, last_name, date_of_birth
            , gender, ssn, email, phone, mobile, address, city, state, zip_code, country, emergency_contact_name, emergency_contact_phone, insurance_provider, insurance_policy_number, primary_physician, preferred_language, patient_status, registration_date
        });

        return res.status(200).json({
            message: "Patient updated successfully",
            data: patient
        });

    }
    catch (error) {
        return res.api.error("Failed to update patient");
    }
};

export const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByPk(id);
        if (!patient) {
            return res.api.notFound("Patient not found");
        }
        await patient.destroy();
        return res.status(200).json({
            message: "Patient deleted successfully"
        });
    }
    catch (error) {
        return res.api.error("Failed to delete patient");
    }
};



export const exportPatientsCSV = async (req, res) => {
    try {
        const allPatients = await Patient.findAll({ raw: true });

        if (!allPatients.length) {
            return res.api.notFound("No patients found");
        }
        const fields = [
            "first_name",
            "middle_name",
            "last_name",
            "date_of_birth",
            "gender",
            "ssn",
            "email",
            "phone",
            "mobile",
            "address",
            "city",
            "state",
            "zip_code",
            "country",
            "emergency_contact_name",
            "emergency_contact_phone",
            "insurance_provider",
            "insurance_policy_number",
            "primary_physician",
            "preferred_language",
            "patient_status",
            "registration_date"
        ];


        const parser = new Parser({ fields });
        const csv = parser.parse(allPatients);
        res.header("Content-Type", "text/csv");
        res.attachment("patients.csv");

        return res.send(csv);

    } catch (error) {
        return res.api.error("Failed to export patients CSV");
    }
};

export const getPatientByAppointmentId = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        const patientData = await Patient.findOne({
            include: [
                {
                    model: Appointment,
                    where: { id: appointmentId },
                    attributes: ['status'],
                    required: true,
                    include: [
                        {
                            model: Visit,
                            attributes: ['diagnosis', 'treatment', 'prescription', 'notes', 'vital_signs']
                        }
                    ]
                },
                {
                    model: Case,
                    required: false
                }
            ]
        });

        if (!patientData) {
            return res.status(404).json({ message: "Patient or Appointment not found" });
        }

        return res.status(200).json({
            message: "Success",
            data: patientData
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to retrieve patient data"
        });
    }
};


export const recoverDeletedPatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findOne({
            where: { id },
            paranoid: false
        });
        if (!patient) {
            return res.api.notFound("Patient not found");
        }
        if (!patient.deletedAt) {
            return res.status(400).json({
                message: "Patient is not deleted"
            });
        }
        await patient.restore();
        return res.status(200).json({
            message: "Patient recovered successfully", 
            data: patient
        });
    }
    catch (error) {
        return res.api.error("Failed to recover patient");
    }
};





