'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('batches', 'college_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'colleges',
          key: 'id',
        },
        allowNull: false,
      })
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('batches', 'college_id')
    ]);
  }
};
