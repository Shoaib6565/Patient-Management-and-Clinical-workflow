// models/visit.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Visit extends Model {
    static associate(models) {
      this.belongsTo(models.Appointment, { foreignKey: 'appointment_id' });
      this.belongsTo(models.Patient, { foreignKey: 'patient_id' });
      this.belongsTo(models.User, { as: 'doctor', foreignKey: 'doctor_id' });
    }
  }

  Visit.init(
    {
      visit_number: { type: DataTypes.STRING, unique: true },
      visit_date: DataTypes.DATEONLY,
      visit_time: DataTypes.TIME,
      diagnosis: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Visit',
      tableName: 'visits',
      paranoid: true,
      underscored: true,
    }
  );

  return Visit;
};