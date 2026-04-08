import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

import UserModel from "./users.model.js";
// import RoleModel from "./roles.model.js";
// import PermissionModel from "./permissions.model.js";

const db = {};

// Initialize models
db.User = UserModel(sequelize, DataTypes);
// db.Role = RoleModel(sequelize, DataTypes);
// db.Permission = PermissionModel(sequelize, DataTypes);

// Run associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
export { sequelize };