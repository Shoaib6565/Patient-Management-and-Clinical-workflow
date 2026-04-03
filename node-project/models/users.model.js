import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Your DB connection

class User extends Model {}

const User = sequelize.define('User',{
  // Attributes
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('Admin', 'Doctor','FrontDesk'),
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  sequelize,
  modelName: 'Users', // Table name will be 'Users' by default
  timestamps: true   // Adds createdAt and updatedAt
});

export default User;