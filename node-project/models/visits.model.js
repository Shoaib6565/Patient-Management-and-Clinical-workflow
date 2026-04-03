import datatyepes from 'sequelize';
import db from '../config/database.js';

const Visits = db.define('visit', {
    id: {
        type: datatyepes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    visit_number:
    {
        type: datatyepes.STRING,
        allowNull: false    
    },
    visit_date: {
        type: datatyepes.DATE,
        allowNull: false
    },
    visit_time: {
        type: datatyepes.TIME,
        allowNull: false
    },
    visit_duration_minutes: {
        type: datatyepes.INTEGER,
        allowNull: false
    },
    diagnosis: {
        type: datatyepes.text
    },
    diagnosis_code: {
        type: datatyepes.JSON,
    },
    treatment : {
        type: datatyepes.text
    },
    treatment_plan: {
        type: datatyepes.text
    },
    notes: {
        type: datatyepes.text
    },
    vital_signs: {
        type: datatyepes.JSON
    },
    symptoms: {
        type: datatyepes.text
    },
    follow_up : {
        type: datatyepes.BOOLEAN
    },
    follow_up_date: {
        type: datatyepes.DATE
    },
    referral_made: {
        type: datatyepes.BOOLEAN
    },
    referral_to: {
        type: datatyepes.STRING
    },
    visit_status: {
        type: datatyepes.ENUM('draft','scheduled', 'completed', 'cancelled'),
        defaultValue: 'scheduled'
    },
    completed_at: {
        type: datatyepes.DATE
    },
    created_at: {
        type: datatyepes.DATE,
        defaultValue: datatyepes.NOW
    },
    updated_at: {
        type: datatyepes.DATE,
        defaultValue: datatyepes.NOW
    },
    deleted_at: {
        type: datatyepes.DATE
    }
}, {
    tableName: 'visits',
    timestamps: true,
    paranoid: true
});


