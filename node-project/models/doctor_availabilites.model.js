// models/doctor_availability.js
'use strict';
import { Model } from 'sequelize'; 

export default (sequelize, DataTypes) => {
  class DoctorAvailability extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.PracticeLocation, { foreignKey: 'practice_location_id' });
    }
  }

  DoctorAvailability.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: DataTypes.BIGINT,
      practice_location_id: DataTypes.BIGINT,
      day_of_week: DataTypes.ENUM(
        'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'
      ),
      start_time: DataTypes.TIME,
      end_time: DataTypes.TIME,
      is_available: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: 'DoctorAvailability',
      tableName: 'doctor_availabilities',
      timestamps: false,
      underscored: true,
    }
  );

  return DoctorAvailability;
};