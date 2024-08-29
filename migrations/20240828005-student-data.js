// 'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      roll_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      college_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      batch_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'batches', // Reference the Batch model
          key: 'id',
        },
      },
      branch: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_on: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_on: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      added_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'admins',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('students');
  }
};
