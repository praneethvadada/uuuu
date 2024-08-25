// Import necessary modules
import { DataTypes } from 'sequelize';
import sequelize from '../conf/db.js'; // adjust the path as needed
import Staff from './staff.js';

// Define the Student model
const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  roll_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  college_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_on: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_on: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  added_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'staff', // Name of the admin table
      key: 'id',
    },
  },
}, { // Optional: explicitly specify the table name
  timestamps: false, // Disable automatic creation of 'createdAt' and 'updatedAt' fields
});

// Export the model

// Define associations
Student.belongsTo(Staff, { foreignKey: 'added_by', as: 'admin' });

export default Student;
