import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Appointment = sequelize.define('appointment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    appointment_number: {
        type: DataTypes.STRING,
        unique: true,
    },
    appointment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,   
    },
    appointment_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    appointment_type: {
        type: DataTypes.ENUM(
            'New Patient', 'Follow-up', 'Consultation', 'Procedure',
            'Telehealth', 'Emergency', 'Routine Checkup', 'Post-op Follow-up'
        ),
    },
    duration_minutes: { 
        type: DataTypes.INTEGER,
        defaultValue: 30,
    },
    status: {
        type: DataTypes.ENUM(
            'Scheduled', 'Completed', 'Cancelled', 'No Show', 'Rescheduled'
        ),
        defaultValue: 'Scheduled',
    },
    reminder_sent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    reminder_method: {
        type: DataTypes.ENUM('Email', 'SMS', 'Phone Call'),
        defaultValue: 'Email',
    },
    notes: {
        type: DataTypes.TEXT,
    },
    reason_for_visit: {
        type: DataTypes.TEXT,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    deleted_at: {
        type: DataTypes.DATE,
    },
}, {
    sequelize,
    modelName: 'Appointment',
    timestamps: true,
    paranoid: true, // Enables soft deletes (deleted_at)
});
export default Appointment;