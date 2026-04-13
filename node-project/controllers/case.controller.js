import { Case, Patient } from "../models/index.js";
import { Parser } from "json2csv";
import { Op } from "sequelize";
//get api seacrh and filter functionality , pagination limit 10, view all patients

const getAll = async (req, res) => {
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
                    required: !!patientName // inner join only if filtering
                }
            ],
            limit: Number(limit),
            offset: Number(offset),
            order: [["created_at", "DESC"]]
        });

        return res.status(200).json({
            success: true,
            total: cases.count,
            page: Number(page),
            pages: Math.ceil(cases.count / limit),
            data: cases.rows
        });

    } catch (error) {
        return res.api.error("Failed to retrieve cases: ", error);
    }
};


const getById = async (req, res) => {
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

const create = async (req, res) => {
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

        const newCase = await Case.create({
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
        });

        return res.status(201).json({
            success: true,
            message: "Case created successfully",
            data: newCase
        });

    } catch (error) {
        return res.api.error(error);
    }
};

const update = async (req, res) => {
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

const softDelete = async (req, res) => {
};


const exportCasesCSV = async (req, res) => {
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

export default {
    getAll,
    getById,
    create,
    update,
    softDelete,
    exportCasesCSV
};