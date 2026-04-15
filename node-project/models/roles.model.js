import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsToMany(models.User, {
        through: models.UserRole,
        foreignKey: "role_id",
        otherKey: "user_id",
        as: "users",
      });

      Role.belongsToMany(models.Permission, {
        through: models.RolePermission,
        foreignKey: "role_id",
        otherKey: "permission_id",
        as: "permissions",
      });
    }
  }

  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "roles",
      timestamps: false,
    }
  );

  return Role;
};