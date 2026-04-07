'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) //model relate eachother 
     {
      // Role ↔ Permission
      this.belongsToMany(models.Permission, {
        through: models.RolePermission,
        foreignKey: 'role_id',
      });

      // Role ↔ User
      this.belongsToMany(models.User, {
        through: models.UserRole,
        foreignKey: 'role_id',
      });
    }
  }

  Role.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'roles',
      timestamps: false,
      underscored: true,
    }
  );

  return Role;
};