'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('question_colleges', {
      id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
      },

    question_id: {
        type: Sequelize.UUID,
        references: {
          model: 'questions', 
          key: 'id',
        },
        allowNull: false,
      },
    
    batch_id:{
        type:Sequelize.INTEGER,
        references:{
            model:'batches',
            key:'id'
        },
        allowNull:false,
      }

    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('question_colleges');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
