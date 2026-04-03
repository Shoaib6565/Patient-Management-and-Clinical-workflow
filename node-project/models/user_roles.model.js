import { DataTypes } from "sequelize";
import db from "../config/database.js";

const user_role = db.define('user_role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    timestamps: false
});
export default user_role;