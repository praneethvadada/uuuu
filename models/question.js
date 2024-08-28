import { DataTypes } from 'sequelize';
import sequelize from '../conf/db.js'; // Adjust the path as needed
import Admin from './admin.js';
// import Domain from './domain.js'; // Import the Domain model if domain_ref is a foreign key

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  testcases: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  added_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Staff, // 'Staff' would be the name of the Staff model
      key: 'id',
    },
  },
  active_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  approval_status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },
  domain_ref: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Domain, // 'Domain' would be the name of the Domain model
      key: 'id',
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    allowNull: false,
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  added_on: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  modified_on: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false, // Disables automatic createdAt and updatedAt fields
  tableName: 'questions', // Specifies the table name in the database
});

// Associations
Question.belongsTo(Staff, {
  foreignKey: 'added_by',
  as: 'admin',
});

Question.belongsTo(Domain, {
  foreignKey: 'domain_ref',
  as: 'domain',
});

export default Question;
