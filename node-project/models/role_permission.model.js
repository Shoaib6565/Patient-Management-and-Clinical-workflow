'use strict';

module.exports = (sequelize, DataTypes) => {
  const RolePermission = sequelize.define(
    'RolePermission',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      role_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      permission_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      tableName: 'role_permissions',
      timestamps: false,
      underscored: true,
    }
  );

  RolePermission.associate = function (models) {
    RolePermission.belongsTo(models.Role, {
      foreignKey: 'role_id',
      onDelete: 'CASCADE',
    });

    RolePermission.belongsTo(models.Permission, {
      foreignKey: 'permission_id',
      onDelete: 'CASCADE',
    });
  };

  return RolePermission;
};