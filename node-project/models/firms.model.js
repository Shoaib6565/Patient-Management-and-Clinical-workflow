// models/firm.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Firm extends Model {
    static associate(models) {
      this.hasMany(models.Case, { foreignKey: 'firm_id' });
    }
  }

  Firm.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firm_name: DataTypes.STRING,
      firm_type: DataTypes.ENUM('Legal','Corporate','Government','Other'),
      address: DataTypes.TEXT,
      phone: DataTypes.STRING,
      contact_person: DataTypes.STRING,
      is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: 'Firm',
      tableName: 'firms',
      timestamps: false,
      underscored: true,
    }
  );

  return Firm;
};