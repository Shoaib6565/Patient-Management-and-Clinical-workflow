import { DataTypes } from "sequelize";
import db from "../config/database.js";

const permission = db.define('permission', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    permission_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});
export default permission;