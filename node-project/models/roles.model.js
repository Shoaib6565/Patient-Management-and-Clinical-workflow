'use strict';
<<<<<<< HEAD

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
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
    },
    {
      tableName: 'roles',
      timestamps: false,
      underscored: true,
    }
  );

  
  Role.belongsToMany(models.User, {
  through: models.UserRole,
  foreignKey: 'role_id',
});

Role.belongsToMany(models.Permission, {
  through: models.RolePermission,
  foreignKey: 'role_id',
});
=======
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
>>>>>>> b51cdb19601096eab18448278d5dbdcfa2a545b3

  return Role;
};