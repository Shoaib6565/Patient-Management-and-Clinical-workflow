// models/appointment.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate(models) {
      this.belongsTo(models.User, { as: 'doctor', foreignKey: 'doctor_id' });
      this.belongsTo(models.Patient, { foreignKey: 'patient_id' });
      this.belongsTo(models.Case, { foreignKey: 'case_id' });
    }
  }

  Appointment.init(
    {
      appointment_number: { type: DataTypes.STRING, unique: true },
      appointment_date: DataTypes.DATEONLY,
      appointment_time: DataTypes.TIME,
      status: DataTypes.ENUM('Scheduled','Confirmed','Completed'),
    },
    {
      sequelize,
      modelName: 'Appointment',
      tableName: 'appointments',
      paranoid: true,
      underscored: true,
    }
  );

  return Appointment;
};