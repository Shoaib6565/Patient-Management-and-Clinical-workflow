import { DataTypes } from "sequelize";
import db from "../config/database.js";

const PracticeLocation = db.define('practice_location', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    location_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT
    },
    city: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING
    },
    zip_code: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true,
    underscored: true
});