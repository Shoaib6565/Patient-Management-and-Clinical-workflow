// models/case.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Case extends Model {
    static associate(models) {
      this.belongsTo(models.Patient, { foreignKey: 'patient_id' });
      this.belongsTo(models.Category, { foreignKey: 'category_id' });
      this.belongsTo(models.PracticeLocation, { foreignKey: 'practice_location_id' });
      this.belongsTo(models.Insurance, { foreignKey: 'insurance_id' });
      this.belongsTo(models.Firm, { foreignKey: 'firm_id' });
    }
  }

  Case.init(
    {
      case_number: { type: DataTypes.STRING, unique: true },
      purpose_of_visit: DataTypes.TEXT,
      case_type: DataTypes.ENUM('Initial Consultation','Follow-up','Emergency','Chronic Care','Preventive Care','Pre-surgical','Post-surgical'),
      priority: DataTypes.ENUM('Low','Normal','High','Urgent'),
      case_status: DataTypes.ENUM('Active','On Hold','Closed','Transferred','Cancelled'),
      opening_date: DataTypes.DATEONLY,
      closing_date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'Case',
      tableName: 'cases',
      paranoid: true,
      underscored: true,
    }
  );

  return Case;
};