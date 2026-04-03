import datatyepes from 'sequelize';
import db from '../config/database.config.js';

const Specialty = db.define('specialty', {
    id: {
        type: datatyepes.INTEGER,   
        primaryKey: true,
        autoIncrement: true
    },
    specialty_name: {
        type: datatyepes.STRING,
        allowNull: false
    },
    description: {
        type: datatyepes.STRING,
       allowNull: true
    },
    is_active: {
        type: datatyepes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false
}); 