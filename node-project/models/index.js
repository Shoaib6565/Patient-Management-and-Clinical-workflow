import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

import User from "./users.model.js";
import Role from "./roles.model.js";
import Permission from "./permissions.model.js";
import UserRole from "./user_roles.model.js";
import RolePermission from "./role-permission.model.js";
import patients from "./patients.model.js";
import appointments from "./appointments.model.js";
import cases from "./cases.model.js";
import firm from "./firms.model.js";
import practiceLocation from "./practice_locations.model.js";
import visits from "./visits.model.js";
import specialties from "./specialties.model.js";
import doctor_availabilities from "./doctor_availabilites.model.js";
import doctor_specialties from "./doctor_specialties.model.js";
import category from "./category.model.js";
import insurance from "./insurances.model.js";



const db = {};

// Initialize models
db.User = User(sequelize, DataTypes);
db.Role = Role(sequelize, DataTypes);
db.Permission = Permission(sequelize, DataTypes);
db.UserRole = UserRole(sequelize, DataTypes);
db.RolePermission = RolePermission(sequelize, DataTypes);
db.patients = patients(sequelize, DataTypes);
db.appointments = appointments(sequelize, DataTypes);
db.cases = cases(sequelize, DataTypes);
db.insurance = insurance(sequelize, DataTypes);
db.firm = firm(sequelize, DataTypes);
db.practiceLocation = practiceLocation(sequelize, DataTypes);
db.visits = visits(sequelize, DataTypes);
db.specialties = specialties(sequelize, DataTypes);
db.doctor_availabilities = doctor_availabilities(sequelize, DataTypes);
db.doctor_specialties = doctor_specialties(sequelize, DataTypes);
db.category = category(sequelize, DataTypes);

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