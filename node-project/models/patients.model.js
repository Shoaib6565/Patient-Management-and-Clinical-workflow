import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Patient = sequelize.define(
    "Patient",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        middle_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_of_birth: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        gender: {
            type: DataTypes.ENUM("Male", "Female", "Other", "Prefer Not to Say"),
        },
        ssn: { type: DataTypes.STRING, unique: true },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: { isEmail: true },
        },
        phone: {
            type: DataTypes.STRING,
        },
        mobile: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.STRING,
        },
        zip_code: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        emergency_contact_name: {
            type: DataTypes.STRING,
        },
        emergency_contact_phone: {
            type: DataTypes.STRING,
        },
        preferred_language: {
            type: DataTypes.STRING,
            defaultValue: "English",
        },

        patient_status: {
            type: DataTypes.ENUM("Active", "Inactive", "Deceased", "Transferred"),
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
            type: DataTypes.DATE
        },

        registration_date: DataTypes.DATE,
    },
    {
        paranoid: true, // Enables soft deletes (sets deleted_at instead of hard deleting)
        timestamps: true, // Adds createdAt and updatedAt fields
        underscored: true, // Use snake_case for automatically added fields
    }
);

export default Patient;
