'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    'UserRole',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      role_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      tableName: 'user_roles',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['user_id', 'role_id'],
        },
      ],
    }
  );

  UserRole.associate = function (models) {
    UserRole.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });

    UserRole.belongsTo(models.Role, {
      foreignKey: 'role_id',
      onDelete: 'CASCADE',
    });
  };

  return UserRole;
};