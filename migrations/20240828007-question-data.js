// 'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('questions', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    testcases: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    added_by: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'admins', // Ensure the Staff table name is correct
        key: 'id',
      },
    },
    active_status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    approval_status: {
      type: Sequelize.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
    },
    domain_ref: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'domains', // Ensure the Domain table name is correct
        key: 'id',
      },
    },
    status: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    difficulty: {
      type: Sequelize.ENUM('easy', 'medium', 'hard'),
      allowNull: false,
    },
    comments: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    tags: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    added_on: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    modified_on: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('questions');
}
