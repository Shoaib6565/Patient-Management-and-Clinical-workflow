import { DataTypes } from "sequelize";
import db from "../config/database.js";

const firm = db.define('firm', {
    id: {
        type: DataTypes.INTEGER,
    },
    firm_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firm_type: {
        type: DataTypes.ENUM('legal', 'corporate', 'Government', 'Other')
    },
    address: {
        type: DataTypes.TEXT
    },
    phone: {
        type: DataTypes.STRING
    },
    is_active: {
        type: DataTypes.BOOLEAN,
    },
}, {
    timestamps: false
});