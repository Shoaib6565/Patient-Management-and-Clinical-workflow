import db from "../models/index.js";
import { Parser } from "json2csv";
import { Op } from "sequelize";
const { Case, Patient, PracticeLocation, Category, Insurance, Firm } = db;

export const getAll = async (req,res)=>{

try{

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
page=1,
limit=10

}=req.query;


const pageNumber=Number(page);
const pageSize=Number(limit);

const offset=(pageNumber-1)*pageSize;


let where={
deleted_at:null
};

let patientWhere={};


if(patientName){

patientWhere[Op.or]=[
{
first_name:{
[Op.like]:`%${patientName}%`
}
},

{
middle_name:{
[Op.like]:`%${patientName}%`
}
},

{
last_name:{
[Op.like]:`%${patientName}%`
}
}

];

}



if(caseNumber)
where.case_number={
[Op.like]:`%${caseNumber}%`
};


if(caseType)
where.case_type={
[Op.like]:`%${caseType}%`
};


if(categoryId)
where.category_id=categoryId;


if(caseStatus)
where.case_status=caseStatus;


if(practiceLocationId)
where.practice_location_id=practiceLocationId;


if(insuranceProviderId)
where.insurance_id=insuranceProviderId;



if(startDate || endDate){

where.opening_date={};

if(startDate)
where.opening_date[Op.gte]=startDate;

if(endDate)
where.opening_date[Op.lte]=endDate;

}



const {count,rows}=await Case.findAndCountAll({

where,

include:[

{
model:Patient,
where:Object.keys(patientWhere).length ? patientWhere : {},
required:!!patientName
},

{
model:Category,
attributes:["id","name"]
},

{
model:Insurance,
attributes:["id","insurance_name"],
required:false
},

{
model:Firm,
attributes:["id","firm_name"],
required:false
},

{
model:PracticeLocation,
attributes:["id","location_name"]
}

],

limit:pageSize,
offset,

order:[
["created_at","DESC"]
]

});


return res.status(200).json({

success:true,

page:pageNumber,

limit:pageSize,

total:count,

hasNextPage:
offset+pageSize<count,

hasPrevPage:
pageNumber>1,

data:rows

});


}

catch(error){

console.error(error);

return res.status(500).json({
success:false,
message:error.message
});

}

};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const caseData = await Case.findOne({
      where: {
        id,
        deleted_at: null,
      },
    });

    if (!caseData) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: caseData,
    });
  } catch (error) {
    return res.api.error(error);
  }
};

export const create = async (req, res) => {
  try {

    const {
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


    if (!patient_id || !practice_location_id) {
      return res.status(400).json({
        success: false,
        message: "patient_id and practice_location_id are required"
      });
    }


    const currentYear = new Date().getFullYear();

    const lastCase = await Case.findOne({
      where: {
        case_number: {
          [Op.like]: `CASE-${currentYear}-%`
        }
      },
      order: [["id", "DESC"]]
    });

    let next = 1;

    if (lastCase) {
      const lastNum = parseInt(lastCase.case_number.split("-")[2]);
      next = lastNum + 1;
    }

    const case_number = `CASE-${currentYear}-${String(next).padStart(5, "0")}`;


    const newCase = await Case.create({

      case_number,

      patient_id,
      practice_location_id,

      category_id: category_id || null,
      insurance_id: insurance_id || null,
      firm_id: firm_id || null,

      case_type: case_type || null,
      case_status: case_status || null,
      priority: priority || null,

      purpose_of_visit,
      date_of_accident,
      opening_date,

      referred_by,
      referred_doctor_name,
      clinical_notes

    });


    const createdCase = await Case.findByPk(newCase.id, {
      include: [
        { model: Patient },
        { model: Category },
        { model: Insurance },
        { model: Firm },
        { model: PracticeLocation }
      ]
    });


    return res.status(201).json({
      success: true,
      message: "Case created successfully",
      data: createdCase
    });

  }

  catch (error) {
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
        message: "Case not found",
      });
    }

    await caseData.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Case updated successfully",
      data: caseData,
    });
    } catch (error) {
    console.error("Update Error:", error); // Log the error to see what went wrong
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }

};

export const Delete = async (req, res) => {
  try {
    const { id } = req.params;
    const caseData = await Case.findByPk(id);
    if (!caseData) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }
    await caseData.destroy();
    return res.status(200).json({
      success: true,
      message: "Case deleted successfully",
    });
  } catch (error) {
    return res.api.error(error);
  }
};

export const exportCasesCSV = async (req, res) => {
  try {
    const allCases = await Case.findAll({
      raw: true,
      where: { deleted_at: null },
    });

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
      "updated_at",
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

export const getCaseCount = async (req, res) => {
  console.log("Received request to get total case count");
  try {
    const count = await Case.count({ where: { deleted_at: null } });
    console.log("Total cases count: ", count);
    return res.status(200).json({
      success: true,
      totalCases: count,
    });
  } catch (error) {
    return res.api.error(error);
  }
};
