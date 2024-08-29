// Import necessary modules
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Admin from './admin.js';
import Batch from './batch.js' // Import the Batch model

// Define the Student model
  const Student = sequelize.define('student', 
  {
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
  batch_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Batch', // Reference the Batch model
      key: 'id',
    },
  },
  branch: {
    type: DataTypes.STRING,
    allowNull: true,
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
      model: 'admin', 
      key: 'id',
    },
  },
}

);

// Define associations
Student.belongsTo(Admin, { foreignKey: 'added_by', as: 'admin' });
Student.belongsTo(Batch, { foreignKey: 'batch_id', as: 'batch' }); // Define the association with Batch

// Export the model
export default Student;
