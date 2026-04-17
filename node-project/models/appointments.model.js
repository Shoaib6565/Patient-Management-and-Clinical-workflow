// models/appointment.js
'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate(models) {
      this.belongsTo(models.Case, { foreignKey: 'case_id' });

      Appointment.belongsTo(models.User, {
        foreignKey: "userId",
      });

      this.belongsTo(models.User, {
        foreignKey: 'created_by',
        as: 'creator',
      });

      this.belongsTo(models.PracticeLocation, {
        foreignKey: 'practice_location_id',
      });

      this.hasOne(models.Visit, {
        foreignKey: 'appointment_id',
      });
    }
  }

  Appointment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      appointment_number: {
        type: DataTypes.STRING,
        unique: true,
      },

      case_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      doctor_id: DataTypes.INTEGER,

      appointment_date: DataTypes.DATEONLY,
      appointment_time: DataTypes.TIME,
      end_time: DataTypes.TIME,

      appointment_type: DataTypes.STRING,
      practice_location_id: DataTypes.INTEGER,

      duration_minutes: DataTypes.INTEGER,

      status: DataTypes.STRING,

      reminder_sent: DataTypes.BOOLEAN,
      reminder_method: DataTypes.STRING,

      notes: DataTypes.TEXT,
      reason_for_visit: DataTypes.TEXT,

      created_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Appointment',
      tableName: 'appointments',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  return Appointment;
};