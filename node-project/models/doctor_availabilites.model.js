<<<<<<< HEAD
'use strict';

module.exports = (sequelize, DataTypes) => {
  const DoctorAvailability = sequelize.define(
    'DoctorAvailability',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      practice_location_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      day_of_week: {
        type: DataTypes.ENUM(
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ),
        allowNull: false,
      },

      start_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },

      end_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },

      is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'doctor_availabilities',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          fields: ['user_id', 'day_of_week'],
        },
      ],
    }
  );

  DoctorAvailability.associate = function (models) {
    DoctorAvailability.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });

    DoctorAvailability.belongsTo(models.PracticeLocation, {
      foreignKey: 'practice_location_id',
      onDelete: 'CASCADE',
    });
  };

=======
// models/doctor_availability.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DoctorAvailability extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.PracticeLocation, { foreignKey: 'practice_location_id' });
    }
  }

  DoctorAvailability.init(
    {
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

>>>>>>> b51cdb19601096eab18448278d5dbdcfa2a545b3
  return DoctorAvailability;
};