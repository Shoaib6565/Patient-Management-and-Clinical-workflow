'use strict';

module.exports = (sequelize, DataTypes) => {
  const Specialty = sequelize.define(
    'Specialty',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      specialty_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'specialties',
      timestamps: false,
      underscored: true,
    }
  );

  Specialty.associate = function (models) {
    Specialty.hasMany(models.Appointment, {
      foreignKey: 'specialty_id',
    });
  };

  return Specialty;
};