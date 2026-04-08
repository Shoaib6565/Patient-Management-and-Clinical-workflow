// models/user.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Appointment, { foreignKey: 'doctor_id', as: 'doctorAppointments' });
      this.hasMany(models.Appointment, { foreignKey: 'created_by', as: 'createdAppointments' });

      this.belongsToMany(models.Role, {
        through: models.UserRole,
        foreignKey: 'user_id',
      });
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      underscored: true,
    }
  );

  return User;
};