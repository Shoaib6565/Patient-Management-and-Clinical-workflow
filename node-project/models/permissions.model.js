import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Permission extends Model {
    static associate(models) {
      Permission.belongsToMany(models.Role, {
        through: models.RolePermission,
        foreignKey: "permission_id",
        otherKey: "role_id",
        as: "roles",
      });
    }
  }

  Permission.init(
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
      modelName: "Permission",
      tableName: "permissions",
      timestamps: false,
    }
  );

  return Permission;
};