// models/solution.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Adjust the path according to your project structure
import Question from './question.js';

const Solution = sequelize.define('solution', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  question_id: {
    type: DataTypes.UUID,
    references: {
      model: Question, // Name of the question model
      key: 'id',
    },
    allowNull: false,
  },
  added_by: {
    type: DataTypes.INTEGER,
    references: {
      model: 'trainers', // Name of the trainer model
      key: 'id',
    },
    allowNull: false,
  },
}, {
  tableName: 'solutions',
  timestamps: true, // Adjust based on your requirements
});

export default Solution;
