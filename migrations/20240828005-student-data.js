// 'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  /**
   * Add altering commands here.
   *
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */
  await queryInterface.createTable("students", {
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
}
export async function down(queryInterface, Sequelize) {
  return queryInterface.dropTable("students");
}
