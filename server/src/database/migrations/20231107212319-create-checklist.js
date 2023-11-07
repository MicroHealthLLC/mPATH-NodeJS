'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Checklists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      listable_type: {
        type: Sequelize.STRING
      },
      listable_id: {
        type: Sequelize.INTEGER
      },
      checked: {
        type: Sequelize.BOOLEAN
      },
      text: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      position: {
        type: Sequelize.INTEGER
      },
      due_date: {
        type: Sequelize.DATE
      },
      planned_effort: {
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('Checklists');
  }
};