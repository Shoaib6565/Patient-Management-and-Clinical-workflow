<<<<<<< HEAD
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

=======
// models/doctor_specialty.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DoctorSpecialty extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Specialty, { foreignKey: 'specialty_id' });
    }
  }

  DoctorSpecialty.init(
    {
      user_id: DataTypes.BIGINT,
      specialty_id: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: 'DoctorSpecialty',
      tableName: 'doctor_specialties',
      timestamps: false,
      underscored: true,
    }
  );

>>>>>>> b51cdb19601096eab18448278d5dbdcfa2a545b3
  return DoctorSpecialty;
};