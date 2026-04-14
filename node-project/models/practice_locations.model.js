// models/practice_location.js
'use strict';
import { Model } from 'sequelize'; 

export default (sequelize, DataTypes) => {
  class PracticeLocation extends Model {
    static associate(models) {
      this.hasMany(models.Case, { foreignKey: 'practice_location_id' });
      this.hasMany(models.Appointment, { foreignKey: 'practice_location_id' });
    }
  }

  PracticeLocation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
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