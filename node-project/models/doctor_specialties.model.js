// models/doctor_specialty.js
'use strict';
import { Model } from 'sequelize'; 

export default (sequelize, DataTypes) => {
  class DoctorSpecialty extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Specialty, { foreignKey: 'specialty_id' });
    }
  }

  DoctorSpecialty.init(
    {
      id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
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

  return DoctorSpecialty;
};