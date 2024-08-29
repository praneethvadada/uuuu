'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('question_colleges', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      question_id: {
        type: Sequelize.UUID,
        references: {
          model: 'questions',
          key: 'id',
        },
        allowNull: false,
      },
      batch_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'batches',
          key: 'id',
        },
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('question_colleges');
  }
};
