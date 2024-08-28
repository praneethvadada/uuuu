'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('domains', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      parent_id: {
        type: Sequelize.UUID,
        allowNull: true, // Allows for domains without a parent
        references: {
          model: 'domains', // Self-referencing the domains table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // Allows for soft deletion without breaking associations
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('domains');
  }
};
