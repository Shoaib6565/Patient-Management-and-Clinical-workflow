<<<<<<< HEAD
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define(
    'Appointment',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      appointment_number: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },

      case_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      patient_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      doctor_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      specialty_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      practice_location_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      created_by: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      appointment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      appointment_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },

      end_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },

      appointment_type: {
        type: DataTypes.ENUM(
          'New Patient',
          'Follow-up',
          'Consultation',
          'Procedure',
          'Telehealth',
          'Emergency',
          'Routine Checkup',
          'Post-op Follow-up'
        ),
        allowNull: false,
      },

      duration_minutes: {
        type: DataTypes.INTEGER,
        defaultValue: 30,
      },

      status: {
        type: DataTypes.ENUM(
          'Scheduled',
          'Confirmed',
          'Checked In',
          'In Progress',
          'Completed',
          'Cancelled',
          'No Show',
          'Rescheduled'
        ),
        defaultValue: 'Scheduled',
      },

      reminder_sent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      reminder_method: {
        type: DataTypes.ENUM('SMS', 'Email', 'Phone', 'None'),
        allowNull: true,
      },

      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      reason_for_visit: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'appointments',
      timestamps: true,
      paranoid: true, // soft deletes
=======
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
>>>>>>> b51cdb19601096eab18448278d5dbdcfa2a545b3
      underscored: true,
    }
  );

<<<<<<< HEAD
  Appointment.associate = function (models) {
    Appointment.belongsTo(models.Case, {
      foreignKey: 'case_id',
      onDelete: 'CASCADE',
    });

    Appointment.belongsTo(models.Patient, {
      foreignKey: 'patient_id',
      onDelete: 'CASCADE',
    });

    Appointment.belongsTo(models.User, {
      as: 'doctor',
      foreignKey: 'doctor_id',
      onDelete: 'CASCADE',
    });

    Appointment.belongsTo(models.Specialty, {
      foreignKey: 'specialty_id',
      onDelete: 'CASCADE',
    });

    Appointment.belongsTo(models.PracticeLocation, {
      foreignKey: 'practice_location_id',
      onDelete: 'CASCADE',
    });

    Appointment.belongsTo(models.User, {
      as: 'creator',
      foreignKey: 'created_by',
      onDelete: 'CASCADE',
    });
  };

=======
>>>>>>> b51cdb19601096eab18448278d5dbdcfa2a545b3
  return Appointment;
};