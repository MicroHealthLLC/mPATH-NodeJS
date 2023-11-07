'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ContractPrivileges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      overview: {
        type: Sequelize.STRING
      },
      tasks: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      issues: {
        type: Sequelize.STRING
      },
      admin: {
        type: Sequelize.STRING
      },
      risks: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      project_id: {
        type: Sequelize.INTEGER
      },
      contract_ids: {
        type: Sequelize.STRING
      },
      lessons: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ContractPrivileges');
  }
};