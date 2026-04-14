import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

import User from "./users.model.js";
import Role from "./roles.model.js";
import Permission from "./permissions.model.js";
import UserRole from "./user_roles.model.js";
import RolePermission from "./role-permission.model.js";
import Patient from "./patients.model.js";
import appointments from "./appointments.model.js";
import Case from "./cases.model.js";
import Firm from "./firms.model.js";
import PracticeLocation from "./practice_locations.model.js";
import visits from "./visits.model.js";
import specialties from "./specialties.model.js";
import doctor_availabilities from "./doctor_availabilites.model.js";
import doctor_specialties from "./doctor_specialties.model.js";
import Category from "./category.model.js";
import Insurance from "./insurances.model.js";

const db = {};

// Initialize models 
db.User = User(sequelize, DataTypes);
db.Role = Role(sequelize, DataTypes);
db.Permission = Permission(sequelize, DataTypes);
db.UserRole = UserRole(sequelize, DataTypes);
db.RolePermission = RolePermission(sequelize, DataTypes);
db.Patient = Patient(sequelize, DataTypes);
db.Appointment = appointments(sequelize, DataTypes);
db.Case = Case(sequelize, DataTypes);
db.Insurance = Insurance(sequelize, DataTypes);
db.Firm = Firm(sequelize, DataTypes);
db.PracticeLocation = PracticeLocation(sequelize, DataTypes);
db.Visit = visits(sequelize, DataTypes);
db.Specialty = specialties(sequelize, DataTypes);
db.DoctorAvailability = doctor_availabilities(sequelize, DataTypes);
db.DoctorSpecialty = doctor_specialties(sequelize, DataTypes);
db.Category = Category(sequelize, DataTypes);

//associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
export { sequelize };
