// import Sequelize from 'sequelize';
// import sequelize from '../config/database.js';

// import UserModel from './users.model.js';
// import RoleModel from './roles.model.js';
// import PatientModel from './patients.model.js';
// import CaseModel from './cases.model.js';
// import AppointmentModel from './appointments.model.js';
// import VisitModel from './visitS.model.js';
// import LocationModel from './practiceLocation.model.js';
// import SpecialtyModel from './specialty.model.js';
// import InsuranceModel from './insurance.model.js';
// import FirmModel from './firm.model.js';

// const User = UserModel(sequelize, Sequelize.DataTypes);
// const Role = RoleModel(sequelize, Sequelize.DataTypes);
// const Patient = PatientModel(sequelize, Sequelize.DataTypes);
// const Case = CaseModel(sequelize, Sequelize.DataTypes);
// const Appointment = AppointmentModel(sequelize, Sequelize.DataTypes);
// const Visit = VisitModel(sequelize, Sequelize.DataTypes);
// const Location = LocationModel(sequelize, Sequelize.DataTypes);
// const Specialty = SpecialtyModel(sequelize, Sequelize.DataTypes);
// const Insurance = InsuranceModel(sequelize, Sequelize.DataTypes);
// const Firm = FirmModel(sequelize, Sequelize.DataTypes);

// /* ================= RBAC ================= */
// User.belongsToMany(Role, { through: 'user_roles' });
// Role.belongsToMany(User, { through: 'user_roles' });

// /* ================= PATIENT FLOW ================= */
// Patient.hasMany(Case);
// Case.belongsTo(Patient);

// Case.hasMany(Appointment);
// Appointment.belongsTo(Case);

// Appointment.hasOne(Visit);
// Visit.belongsTo(Appointment);

// /* ================= EXTRA RELATIONS ================= */

// // doctor
// User.hasMany(Appointment, { foreignKey: 'doctor_id' });

// // front desk
// User.hasMany(Appointment, { foreignKey: 'created_by' });

// // patient direct (denormalized)
// Patient.hasMany(Appointment);
// Appointment.belongsTo(Patient);

// // location
// Location.hasMany(Case);
// Case.belongsTo(Location);

// Location.hasMany(Appointment);
// Appointment.belongsTo(Location);

// // specialty
// Specialty.hasMany(Appointment);
// Appointment.belongsTo(Specialty);

// // insurance
// Insurance.hasMany(Case);
// Case.belongsTo(Insurance);

// // firm
// Firm.hasMany(Case);
// Case.belongsTo(Firm);

// export {
//   sequelize,
//   User,
//   Role,
//   Patient,
//   Case,
//   Appointment,
//   Visit,
//   Location,
//   Specialty,
//   Insurance,
//   Firm,
// };