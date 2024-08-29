// import { DataTypes } from 'sequelize';
const { DataTypes} = require('sequelize');
import sequelize from '../config/db.js';
import College from './college.js';

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
  college_id:{
    type:DataTypes.INTEGER,
    references:{
      model:College,
      key:'id',
    },
    allowNull:false,
  }
}, {
  timestamps: true,
});

// Export the model
export default Batch;