// models/specialty.js
'use strict';
import { Model } from 'sequelize'; 
export default (sequelize, DataTypes) => {
  class Specialty extends Model {
    static associate(models) {
      this.hasMany(models.Appointment, { foreignKey: 'specialty_id' });

      this.belongsToMany(models.User, {
        through: models.DoctorSpecialty,
        foreignKey: 'specialty_id',
      });
    }
  }

  Specialty.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      specialty_name: { type: DataTypes.STRING, unique: true },
      description: DataTypes.TEXT,
      is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: 'Specialty',
      tableName: 'specialties',
      timestamps: false,
      underscored: true,
    }
  );

  return Specialty;
};