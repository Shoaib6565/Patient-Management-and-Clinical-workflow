// models/visit.js
'use strict';
import { Model } from 'sequelize'; 

export default (sequelize, DataTypes) => {
  class Visit extends Model {
    static associate(models) {
      this.belongsTo(models.Appointment, {
        foreignKey: 'appointment_id',
      });
    }
  }

  Visit.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      visit_number: {
        type: DataTypes.STRING,
        unique: true,
      },

      appointment_id: {
        type: DataTypes.INTEGER,
        unique: true,
      },

      visit_date: DataTypes.DATEONLY,
      visit_time: DataTypes.TIME,
      visit_duration_minutes: DataTypes.INTEGER,

      diagnosis: DataTypes.TEXT,
      diagnosis_code: DataTypes.JSON,

      treatment: DataTypes.TEXT,
      treatment_plan: DataTypes.TEXT,

      prescription: DataTypes.TEXT,
      prescription_documents: DataTypes.JSON,

      notes: DataTypes.TEXT,
      vital_signs: DataTypes.JSON,
      symptoms: DataTypes.TEXT,

      follow_up_required: DataTypes.BOOLEAN,
      follow_up_date: DataTypes.DATEONLY,

      referral_made: DataTypes.BOOLEAN,
      referral_to: DataTypes.STRING,

      visit_status: DataTypes.STRING,
      completed_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Visit',
      tableName: 'visits',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  return Visit;
};