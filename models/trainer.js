import { DataTypes } from 'sequelize';
import sequelize from '../conf/db.js'; // Adjust the path as needed
import Admin from './admin.js';
import College from './college.js'; // Assuming there's a College model

const Trainer = sequelize.define('trainer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensures that the user_id is unique across trainers
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  added_by: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Admin, 
      key: 'id',
    },
  },
  college_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: College, // Assuming College model exists
      key: 'id',
    },
  },
}, {
  timestamps: true, 
  tableName: 'trainers' // Specifies the table name in the database
});

// Associations
Trainer.belongsTo(Admin, {foreignKey: 'added_by',as: 'admin'});

Trainer.belongsTo(College, {
  foreignKey: 'college_id',
  as: 'college', // Alias for the association
});

export default Trainer;
