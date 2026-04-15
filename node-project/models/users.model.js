import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      // MANY-to-MANY with Role
      User.belongsToMany(models.Role, {
        through: models.UserRole,
        foreignKey: "user_id",
        otherKey: "role_id",
        as: "roles",
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
      paranoid: true,
    }
  );

  return User;
};