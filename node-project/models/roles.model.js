import { DataTypes } from "sequelize";
import db from "../config/database.js";

const role = db.define('role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

export default role;