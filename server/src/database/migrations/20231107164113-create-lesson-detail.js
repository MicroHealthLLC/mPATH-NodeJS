'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LessonDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      finding: {
        type: Sequelize.TEXT
      },
      recommendation: {
        type: Sequelize.TEXT
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      lesson_id: {
        type: Sequelize.INTEGER
      },
      detail_type: {
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
    await queryInterface.dropTable('LessonDetails');
  }
};