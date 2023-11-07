'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FacilityPrivileges', {
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
      facility_project_id: {
        type: Sequelize.INTEGER
      },
      facility_id: {
        type: Sequelize.INTEGER
      },
      lessons: {
        type: Sequelize.STRING
      },
      project_id: {
        type: Sequelize.INTEGER
      },
      group_number: {
        type: Sequelize.INTEGER
      },
      facility_project_ids: {
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
    await queryInterface.dropTable('FacilityPrivileges');
  }
};