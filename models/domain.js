import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; 

const Domain = sequelize.define('domain', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parent_id: {
    type: DataTypes.UUID,
    allowNull: true, // Allows for domains without a parent
    references: {
      model: 'domains', // Refers to the same model
      key: 'id',
    },
  },
}, {
  timestamps: false, // Disables automatic createdAt and updatedAt fields
  tableName: 'domains', // Specifies the table name in the database
});

// Self-referencing association for the adjacency list
Domain.hasMany(Domain, {
  foreignKey: 'parent_id',
  as: 'subdomains', // Alias for the association
});

Domain.belongsTo(Domain, {
  foreignKey: 'parent_id',
  as: 'parentDomain', // Alias for the parent association
});

export default Domain;
