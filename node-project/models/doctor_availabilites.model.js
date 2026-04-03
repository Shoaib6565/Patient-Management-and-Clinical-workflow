import { DataTypes } from "sequelize";
import db from "../config/database.js";

const doctor_availability = db.define('doctor_availability', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    day_of_week: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false
});
export default doctor_availability;
