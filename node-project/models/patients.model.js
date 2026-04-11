// models/patient.js
'use strict';
import { Model } from 'sequelize'; 

export default (sequelize, DataTypes) => {
  class Patient extends Model {
    static associate(models) {
      this.hasMany(models.Case, { foreignKey: 'patient_id' });
      this.hasMany(models.Appointment, { foreignKey: 'patient_id' });
    }
  }

  Patient.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: DataTypes.STRING,
      middle_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      date_of_birth: DataTypes.DATEONLY,
      gender: DataTypes.ENUM('Male','Female','Other','Prefer Not to Say'),
      ssn: { type: DataTypes.TEXT, unique: true },
      email: { type: DataTypes.STRING, unique: true },
      phone: DataTypes.STRING,
      mobile: DataTypes.STRING,
      address: DataTypes.TEXT,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip_code: DataTypes.STRING,
      country: DataTypes.STRING,
      emergency_contact_name: DataTypes.STRING,
      emergency_contact_phone: DataTypes.STRING,
      primary_physician: DataTypes.STRING,
      insurance_provider: DataTypes.STRING,
      insurance_policy_number: DataTypes.STRING,
      preferred_language: { type: DataTypes.STRING, defaultValue: 'English' },
      patient_status: DataTypes.ENUM('Active','Inactive','Deceased','Transferred'),
      registration_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Patient',
      tableName: 'patients',
      paranoid: true,
      underscored: true,
    }
  );

  return Patient;
};