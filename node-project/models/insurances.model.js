// models/insurance.js
'use strict';
import { Model } from 'sequelize'; 

export default (sequelize, DataTypes) => {
  class Insurance extends Model {
    static associate(models) {
      this.hasMany(models.Case, { foreignKey: 'insurance_id' });
    }
  }

  Insurance.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      insurance_name: DataTypes.STRING,
      insurance_code: { type: DataTypes.STRING, unique: true },
      address: DataTypes.TEXT,
      phone: DataTypes.STRING,
      is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: 'Insurance',
      tableName: 'insurances',
      timestamps: false,
      underscored: true,
    }
  );

  return Insurance;
};