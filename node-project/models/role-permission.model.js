// models/role_permission.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    static associate(models) {
      this.belongsTo(models.Role, { foreignKey: 'role_id' });
      this.belongsTo(models.Permission, { foreignKey: 'permission_id' });
    }
  }

  RolePermission.init(
    {
      role_id: DataTypes.BIGINT,
      permission_id: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: 'RolePermission',
      tableName: 'role_permissions',
      timestamps: false,
      underscored: true,
    }
  );

  return RolePermission;
};