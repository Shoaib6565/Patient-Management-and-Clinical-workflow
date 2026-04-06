import { DataTypes } from "sequelize";
import db from "../config/database.js";

const insurance = db.define('insurance', {
    id: {
        type: DataTypes.INTEGER,    
        primaryKey: true,
        autoIncrement: true
    },
    insurance_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    insurance_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    address : {
        type: DataTypes.TEXT
    },
    phone : {
        type: DataTypes.STRING
    },
    is_active: {
        type: DataTypes.BOOLEAN,
    },
}, {
    timestamps: false
});