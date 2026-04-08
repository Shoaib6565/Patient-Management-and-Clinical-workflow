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
