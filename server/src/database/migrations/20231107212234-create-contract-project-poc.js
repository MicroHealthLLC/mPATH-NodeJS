'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ContractProjectPocs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      poc_type: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      work_number: {
        type: Sequelize.STRING
      },
      mobile_number: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      user_id: {
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
    await queryInterface.dropTable('ContractProjectPocs');
  }
};