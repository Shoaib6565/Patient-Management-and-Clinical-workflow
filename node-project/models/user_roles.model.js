// models/user_role.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Role, { foreignKey: 'role_id' });
    }
  }

  UserRole.init(
    {
      id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: DataTypes.BIGINT,
      role_id: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: 'UserRole',
      tableName: 'user_roles',
      timestamps: false,
      underscored: true,
    }
  );

  return UserRole;
};