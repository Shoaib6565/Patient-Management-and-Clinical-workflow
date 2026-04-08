<<<<<<< HEAD
"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "users",
      timestamps: true,
      paranoid: true, // soft deletes
      underscored: true,
    },
  );

  User.associate = function (models) {
    // Appointments where user is doctor
    User.hasMany(models.Appointment, {
      foreignKey: "doctor_id",
      as: "doctorAppointments",
    });

    // Appointments created by user
    User.hasMany(models.Appointment, {
      foreignKey: "created_by",
      as: "createdAppointments",
    });

    User.belongsToMany(models.Role, {
      through: models.UserRole,
      foreignKey: "user_id",
    });
  };

  return User;
};
=======
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
>>>>>>> b51cdb19601096eab18448278d5dbdcfa2a545b3
