'use strict';

module.exports = (sequelize, DataTypes) => {
  const PracticeLocation = sequelize.define(
    'PracticeLocation',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      location_name: {
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

      zip: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'practice_locations',
      timestamps: false,
      underscored: true,
    }
  );

  PracticeLocation.associate = function (models) {
    PracticeLocation.hasMany(models.Case, {
      foreignKey: 'practice_location_id',
    });

    PracticeLocation.hasMany(models.Appointment, {
      foreignKey: 'practice_location_id',
    });
  };

  return PracticeLocation;
};