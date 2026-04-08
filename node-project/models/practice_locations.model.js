// models/practice_location.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PracticeLocation extends Model {
    static associate(models) {
      this.hasMany(models.Case, { foreignKey: 'practice_location_id' });
      this.hasMany(models.Appointment, { foreignKey: 'practice_location_id' });
    }
  }

  PracticeLocation.init(
    {
      location_name: DataTypes.STRING,
      address: DataTypes.TEXT,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: 'PracticeLocation',
      tableName: 'practice_locations',
      timestamps: false,
      underscored: true,
    }
  );

  return PracticeLocation;
};