'use strict';

module.exports = (sequelize, DataTypes) => {
  const Firm = sequelize.define(
    'Firm',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      firm_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      firm_type: {
        type: DataTypes.ENUM(
          'Legal',
          'Corporate',
          'Government',
          'Other'
        ),
        allowNull: false,
      },

      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },

      contact_person: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'firms',
      timestamps: false,
      underscored: true,
    }
  );

  Firm.associate = function (models) {
    Firm.hasMany(models.Case, {
      foreignKey: 'firm_id',
    });
  };

  return Firm;
};