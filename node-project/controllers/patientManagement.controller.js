import { patients } from "../models/index.js";
import { Parser } from "json2csv";
import { Op } from "sequelize";
//get api seacrh and filter functionality , pagination limit 10, view all patients
const getAllPatients = async (req, res) => {
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

        if (gender) {
            where.gender = gender;
        }

        if (ssn) {
            where.ssn = { [Op.like]: `%${ssn}%` };
        }

        if (patient_status) {
            where.patient_status = patient_status;
        }
        if (city) {
            where.city = { [Op.like]: `%${city}%` };
        }
        if (state) {
            where.state = { [Op.like]: `%${state}%` };
        }
        if (zip_code) {
            where.zip_code = zip_code;
        }
        if (reg_from || reg_to) {
            where.registration_date = {};
            if (reg_from) where.registration_date[Op.gte] = reg_from;
            if (reg_to) where.registration_date[Op.lte] = reg_to;
        }

        const { count, rows: allPatients } = await patients.findAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']]
        });

        const totalPages = Math.ceil(count / limit);

        return res.api.success("Patients retrieved successfully", {
            patients: allPatients, pagination: {
                totalItems: count,
                totalPages,
                currentPage: parseInt(page),
                itemsPerPage: parseInt(limit)
            }
        });

    } catch (error) {
        return res.api.error("Failed to retrieve patients");
    }
};

const createPatient = async (req, res) => {
    try {
        const { first_name, middle_name, last_name, date_of_birth, gender, ssn, email, phone, mobile, address, city, state, zip_code, country, emergency_contact_name, emergency_contact_phone, insurance_provider, insurance_policy_number, primary_physician, preferred_language, patient_status, registration_date, } = req.body;
        const newPatient = await patients.create({ first_name, middle_name, last_name, date_of_birth, gender, ssn, email, phone, mobile, address, city, state, zip_code, country, emergency_contact_name, emergency_contact_phone, insurance_provider, insurance_policy_number, primary_physician, preferred_language, patient_status, registration_date });
        return res.api.created(newPatient, "Patient created successfully");
    }
    catch (error) {
        return res.api.error("Failed to create patient");
    }
};

const getPatientById = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await patients.findByPk(id);
        if (!patient) {
            return res.api.notFound("Patient not found");
        }
        return res.api.success("Patient retrieved successfully", patient);
    }
    catch (error) {
        return res.api.error("Failed to retrieve patient");
    }
};

const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, middle_name, last_name, date_of_birth, gender, ssn, email, phone, mobile, address, city, state, zip_code, country, emergency_contact_name, emergency_contact_phone, insurance_provider, insurance_policy_number, primary_physician, preferred_language, patient_status, registration_date, } = req.body;
        const patient = await patients.findByPk(id);
        if (!patient) {
            return res.api.notFound("Patient not found");
        }
        await patient.update({
            first_name, middle_name, last_name, date_of_birth
            , gender, ssn, email, phone, mobile, address, city, state, zip_code, country, emergency_contact_name, emergency_contact_phone, insurance_provider, insurance_policy_number, primary_physician, preferred_language, patient_status, registration_date
        });
        return res.api.success("Patient updated successfully", patient);
    }
    catch (error) {
        return res.api.error("Failed to update patient");
    }
};

const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await patients.findByPk(id);
        if (!patient) {
            return res.api.notFound("Patient not found");
        }
        await patient.destroy();
        return res.api.success("Patient deleted successfully");
    }
    catch (error) {
        return res.api.error("Failed to delete patient");
    }
};



const exportPatientsCSV = async (req, res) => {
    try {
        const allPatients = await patients.findAll({ raw: true });

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

const getPatientByAppointmentId = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        const patientData = await patients.findOne({
            include: [
                {
                    model: Case,
                    include: [
                        {
                            model: Appointment,
                            where: { id: appointmentId },

                            attributes: [
                                'status'
                            ],
                            required: true, // ensures filtering by appointmentId
                            include: [
                                {
                                    model: Visit,
                                    attributes: ['diagnosis', 'treatment', 'prescription', 'notes', 'vital_signs']
                                }
                            ]
                        }
                    ]
                }
            ],
            attributes: { exclude: [] }
        });

        res.api.success(patientData);
    } catch (error) {
        return res.api.error("Failed to retrieve patient by appointment ID");
    }
};


export default {
    getAllPatients,
    createPatient,
    getPatientById,
    updatePatient,
    deletePatient,
    exportPatientsCSV,
    getPatientByAppointmentId
};