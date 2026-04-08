<<<<<<< HEAD
const { checkPermission } = require('../utils/authUtils');

const requirePermission = (permission) => {
  return async (req, res, next) => {
    const userId = req.user.id;

    const allowed = await checkPermission(userId, permission);

    if (!allowed) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};

module.exports = requirePermission;
=======
// models/permission.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      this.belongsToMany(models.Role, {
        through: models.RolePermission,
        foreignKey: 'permission_id',
      });
    }
  }

  Permission.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Permission',
      tableName: 'permissions',
      timestamps: false,
    }
  );

  return Permission;
};
>>>>>>> b51cdb19601096eab18448278d5dbdcfa2a545b3
