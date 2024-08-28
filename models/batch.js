// import { DataTypes } from 'sequelize';
const { DataTypes} = require('sequelize');
import sequelize from '../conf/db.js';

// Define the Batch model
const Batch = sequelize.define('batch', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,
});

// Export the model
export default Batch;