<<<<<<< HEAD
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define(
    'Patient',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      middle_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      gender: {
        type: DataTypes.ENUM(
          'Male',
          'Female',
          'Other',
          'Prefer Not to Say'
        ),
        allowNull: false,
      },

      ssn: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      zip_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      emergency_contact_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      emergency_contact_phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      primary_physician: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      insurance_provider: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      insurance_policy_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      preferred_language: {
        type: DataTypes.STRING,
        defaultValue: 'English',
      },

      patient_status: {
        type: DataTypes.ENUM(
          'Active',
          'Inactive',
          'Deceased',
          'Transferred'
        ),
        defaultValue: 'Active',
      },

      registration_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'patients',
      timestamps: true,
=======
// models/patient.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    static associate(models) {
      this.hasMany(models.Case, { foreignKey: 'patient_id' });
      this.hasMany(models.Appointment, { foreignKey: 'patient_id' });
    }
  }

  Patient.init(
    {
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
>>>>>>> b51cdb19601096eab18448278d5dbdcfa2a545b3
      paranoid: true,
      underscored: true,
    }
  );

<<<<<<< HEAD
  Patient.associate = function (models) {
    Patient.hasMany(models.Case, {
      foreignKey: 'patient_id',
    });

    Patient.hasMany(models.Appointment, {
      foreignKey: 'patient_id',
    });
  };

=======
>>>>>>> b51cdb19601096eab18448278d5dbdcfa2a545b3
  return Patient;
};