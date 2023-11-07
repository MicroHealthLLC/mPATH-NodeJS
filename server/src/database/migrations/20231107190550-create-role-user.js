'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RoleUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      project_id: {
        type: Sequelize.INTEGER
      },
      facility_project_id: {
        type: Sequelize.INTEGER
      },
      project_contract_id: {
        type: Sequelize.INTEGER
      },
      project_contract_vehicle_id: {
        type: Sequelize.INTEGER
      },
      resource_type: {
        type: Sequelize.STRING
      },
      resource_id: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('RoleUsers');
  }
};