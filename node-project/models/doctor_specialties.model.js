import { DataTypes } from "sequelize";
import db from "../config/database.js";

const doctor_specialty = db.define('doctor_specialty', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
}, {
    timestamps: false
});
export default doctor_specialty;