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
      paranoid: true,
      underscored: true,
    }
  );

  Patient.associate = function (models) {
    Patient.hasMany(models.Case, {
      foreignKey: 'patient_id',
    });

    Patient.hasMany(models.Appointment, {
      foreignKey: 'patient_id',
    });
  };

  return Patient;
};