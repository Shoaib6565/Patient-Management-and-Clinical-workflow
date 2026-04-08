'use strict';

module.exports = (sequelize, DataTypes) => {
  const Insurance = sequelize.define(
    'Insurance',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      insurance_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      insurance_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },

      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'insurances',
      timestamps: false,
      underscored: true,
    }
  );

  Insurance.associate = function (models) {
    Insurance.hasMany(models.Case, {
      foreignKey: 'insurance_id',
    });
  };

  return Insurance;
};