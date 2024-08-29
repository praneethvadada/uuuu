import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Adjust the path as needed

const College = sequelize.define('college', {
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
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensures that the college code is unique
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  batch:{
    type:DataTypes.STRING,  //product or service
    allowNull:false,
  },
  branch:{
    type:DataTypes.STRING,
    allowNull:true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo: {
    type: DataTypes.BLOB, // Stores the image as a blob
    allowNull: true, // Allows null if no logo is provided
  },
}, {
  timestamps: true, // Disables automatic createdAt and updatedAt fields
  tableName: 'colleges', // Specifies the table name in the database
});

export default College;
