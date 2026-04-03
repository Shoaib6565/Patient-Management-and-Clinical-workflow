import { DataTypes } from "sequelize";
import db from "../config/database.js";

const role_permission = db.define('role_permission', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    timestamps: true
});
export default role_permission;