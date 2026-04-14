// models/case.js
'use strict';
import { Model } from 'sequelize'; 

export default (sequelize, DataTypes) => {
  class Case extends Model {
    static associate(models) {
      this.belongsTo(models.Patient, { foreignKey: 'patient_id' });
      this.belongsTo(models.PracticeLocation, { foreignKey: 'practice_location_id' });
      this.belongsTo(models.Category, { foreignKey: 'category_id' });
      this.belongsTo(models.Insurance, { foreignKey: 'insurance_id' });
      this.belongsTo(models.Firm, { foreignKey: 'firm_id' });

      this.hasMany(models.Appointment, { foreignKey: 'case_id' });
    }
  }

  Case.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },

      case_number: {
        type: DataTypes.STRING,
        unique: true,
      },

      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      practice_location_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,

      purpose_of_visit: DataTypes.TEXT,
      case_type: DataTypes.STRING,
      priority: DataTypes.STRING,
      case_status: DataTypes.STRING,

      date_of_accident: DataTypes.DATEONLY,

      insurance_id: DataTypes.INTEGER,
      firm_id: DataTypes.INTEGER,

      referred_by: DataTypes.STRING,
      referred_doctor_name: DataTypes.STRING,

      opening_date: DataTypes.DATEONLY,
      closing_date: DataTypes.DATEONLY,

      clinical_notes: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Case',
      tableName: 'cases',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  return Case;
};