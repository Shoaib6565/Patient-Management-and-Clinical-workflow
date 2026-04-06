import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Case extends Model { }

const Case = sequelize.define('Case', {
    case_number: {
        type: DataTypes.STRING,
        unique: true,
    },
    category: {
        type: DataTypes.ENUM(
            'General Medicine', 'Surgery', 'Pediatrics', 'Cardiology', 'Orthopedics',
            'Neurology', 'Dermatology', 'Gynecology', 'Ophthalmology', 'ENT', 'Dental', 'Psychiatry',
            'Physical Therapy', 'Emergency', 'Other'
        ),
    },
    purpose_of_visit: DataTypes.TEXT,
    case_type: {
        type: DataTypes.ENUM(
            'Initial Consultation', 'Follow-up', 'Emergency', 'Chronic Care',
            'Preventive Care', 'Pre-surgical', 'Post-surgical'
        ),
    },
    priorty: {
        type: DataTypes.ENUM('Low', 'Normal', 'High', 'Urgent'),
    },
    case_status: {
        type: DataTypes.ENUM(
            'Active', 'On Hold', 'Closed', 'Transferred', 'Cancelled'
        ),
    },
    date_of_accident: DataTypes.DATE,
    referred_by: DataTypes.STRING,
    referred_doctor_name: DataTypes.STRING,
    opening_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    closing_date: DataTypes.DATE,
    clinical_notes: DataTypes.TEXT,
    created_at: {
        type: DataTypes.DATE,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    deleted_at: {
        type: DataTypes.DATE
    }


},
    {
        paranoid: true,
        timestamps: true,
    });
 export default Case;