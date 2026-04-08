// models/insurance.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Insurance extends Model {
    static associate(models) {
      this.hasMany(models.Case, { foreignKey: 'insurance_id' });
    }
  }

  Insurance.init(
    {
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