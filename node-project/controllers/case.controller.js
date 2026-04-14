import db from "../models/index.js";
import { Parser } from "json2csv";
import { Op } from "sequelize";
const { Case, Patient, PracticeLocation, Category, Insurance, Firm } = db;

export const getAll = async (req, res) => {
    try {
        const {
            patientName,
            caseNumber,
            caseType,
            categoryId,
            caseStatus,
            practiceLocationId,
            insuranceProviderId,
            startDate,
            endDate,
            page = 1,
            limit = 10
        } = req.query;

        const offset = (page - 1) * limit;

        let where = {};
        let patientWhere = {};

        if (patientName) {
            patientWhere[Op.or] = [
                { first_name: { [Op.like]: `%${patientName}%` } },
                { middle_name: { [Op.like]: `%${patientName}%` } },
                { last_name: { [Op.like]: `%${patientName}%` } }
            ];
        }

        if (caseNumber) {
            where.case_number = { [Op.like]: `%${caseNumber}%` };
        }

        if (caseType) {
            where.case_type = { [Op.like]: `%${caseType}%` };
        }

        if (categoryId) {
            where.category_id = categoryId;
        }

        if (caseStatus) {
            where.case_status = { [Op.like]: `%${caseStatus}%` };
        }

        if (practiceLocationId) {
            where.practice_location_id = practiceLocationId;
        }

        if (insuranceProviderId) {
            where.insurance_id = insuranceProviderId;
        }

        if (startDate || endDate) {
            where.opening_date = {};

            if (startDate) {
                where.opening_date[Op.gte] = startDate;
            }

            if (endDate) {
                where.opening_date[Op.lte] = endDate;
            }
        }

        const cases = await Case.findAndCountAll({
            where,
            include: [
                {
                    model: Patient,
                    where: Object.keys(patientWhere).length ? patientWhere : undefined,
                    required: !!patientName
                }
            ],
            limit: Number(limit),
            offset: Number(offset),
            order: [["created_at", "DESC"]]
        });


        const absoluteTotal = await Case.count({ where, include: [{ model: Patient, where: patientWhere }] });
        return res.status(200).json({
            success: true,
            total: cases.count,
            page: Number(page),
            pages: Math.ceil(cases.count / limit),
            data: cases.rows,
            totalcases: absoluteTotal
        });

    } catch (error) {
        return res.api.error("Failed to retrieve cases: ", error);
    }
};


export const getById = async (req, res) => {
    try {
        const { id } = req.params;

        const caseData = await Case.findOne({
            where: { id },
        });

        if (!caseData) {
            return res.status(404).json({
                success: false,
                message: "Case not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: caseData
        });

    } catch (error) {
        return res.api.error(error);
    }
};

export const create = async (req, res) => {
    try {
        const {
            case_number,
            patient_id,
            practice_location_id,
            category_id,
            insurance_id,
            firm_id,
            case_type,
            case_status,
            priority,
            purpose_of_visit,
            date_of_accident,
            opening_date,
            referred_by,
            referred_doctor_name,
            clinical_notes
        } = req.body;

        // 🔹 Validate required fields
        if (!case_number || !patient_id || !practice_location_id) {
            return res.status(400).json({
                success: false,
                message: "case_number, patient_id, and practice_location_id are required"
            });
        }

        // 🔹 Validate FK: Patient
        const patient = await Patient.findByPk(patient_id);
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Invalid patient id"
            });
        }

        // 🔹 Validate FK: Practice Location
        const location = await PracticeLocation.findByPk(practice_location_id);
        if (!location) {
            return res.status(404).json({
                success: false,
                message: "Invalid location"
            });
        }

        // 🔹 Optional FK validations
        if (category_id) {
            const category = await Category.findByPk(category_id);
            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: "Invalid category"
                });
            }
        }

        if (insurance_id) {
            const insurance = await Insurance.findByPk(insurance_id);
            if (!insurance) {
                return res.status(404).json({
                    success: false,
                    message: "Invalid insurance_id"
                });
            }
        }

        if (firm_id) {
            const firm = await Firm.findByPk(firm_id);
            if (!firm) {
                return res.status(404).json({
                    success: false,
                    message: "Invalid firm_id"
                });
            }
        }

        // 🔹 Create case
        const newCase = await Case.create({
            case_number,
            patient_id,
            practice_location_id,
            category_id: category_id || null,
            insurance_id: insurance_id || null,
            firm_id: firm_id || null,
            case_type,
            case_status,
            priority,
            purpose_of_visit,
            date_of_accident,
            opening_date,
            referred_by,
            referred_doctor_name,
            clinical_notes
        });

        return res.status(201).json({
            success: true,
            message: "Case created successfully",
            data: newCase
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;

        const caseData = await Case.findByPk(id);

        if (!caseData) {
            return res.status(404).json({
                success: false,
                message: "Case not found"
            });
        }

        await caseData.update(req.body);

        return res.status(200).json({
            success: true,
            message: "Case updated successfully",
            data: caseData
        });

    } catch (error) {
        return res.api.error(error);
    }
};

export const Delete = async (req, res) => {
    try {
        const { id } = req.params;
        const caseData = await Case.findByPk(id);
        if (!caseData) {
            return res.status(404).json({
                success: false,
                message: "Case not found"
            });
        }
        await caseData.destroy();
        return res.status(200).json({
            success: true,
            message: "Case deleted successfully"
        });
    }
    catch (error) {
        return res.api.error(error);
    }
};


export const exportCasesCSV = async (req, res) => {
    try {
        const allCases = await Case.findAll({ raw: true });

        if (!allCases.length) {
            return res.api.notFound("No cases found");
        }

        const fields = [
            "id",
            "case_number",
            "patient_id",
            "practice_location_id",
            "category_id",
            "insurance_id",
            "firm_id",
            "purpose_of_visit",
            "case_type",
            "priority",
            "case_status",
            "date_of_accident",
            "opening_date",
            "closing_date",
            "referred_by",
            "referred_doctor_name",
            "clinical_notes",
            "created_at",
            "updated_at"
        ];

        const parser = new Parser({ fields });
        const csv = parser.parse(allCases);

        res.header("Content-Type", "text/csv");
        res.attachment("cases.csv");

        return res.send(csv);

    } catch (error) {
        console.error(error);
        return res.api.error("Failed to export cases CSV");
    }
};

