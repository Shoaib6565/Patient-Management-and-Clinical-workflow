'use strict';

module.exports = (sequelize, DataTypes) => {
  const DoctorSpecialty = sequelize.define(
    'DoctorSpecialty',
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

      specialty_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      tableName: 'doctor_specialties',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['user_id', 'specialty_id'],
        },
      ],
    }
  );

  DoctorSpecialty.associate = function (models) {
    DoctorSpecialty.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });

    DoctorSpecialty.belongsTo(models.Specialty, {
      foreignKey: 'specialty_id',
      onDelete: 'CASCADE',
    });
  };

  return DoctorSpecialty;
};