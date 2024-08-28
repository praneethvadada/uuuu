'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('solutions',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        question_id: {
          type: Sequelize.UUID,
          references: {
            model: 'questions', // Name of the question model
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        added_by: {
          type: Sequelize.INTEGER,
          references: {
            model: 'trainers', // Name of the trainer model
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      }
    )
  },
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */


  async down (queryInterface, Sequelize) {
    
     await queryInterface.dropTable('solutions');
    
  }
};
