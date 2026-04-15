import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class UserRole extends Model {
    static associate(models) {
      UserRole.belongsTo(models.User, {
        foreignKey: "user_id",
      });

      UserRole.belongsTo(models.Role, {
        foreignKey: "role_id",
      });
    }
  }

  UserRole.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: DataTypes.INTEGER,
      role_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserRole",
      tableName: "user_roles",
      timestamps: false,
      underscored: true,
    }
  );

  return UserRole;
};