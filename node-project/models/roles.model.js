'use strict';

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

  return Role;
};