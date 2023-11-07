'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      office365_key: {
        type: Sequelize.TEXT
      },
      office365_secret: {
        type: Sequelize.TEXT
      },
      google_map_key: {
        type: Sequelize.TEXT
      },
      google_oauth_key: {
        type: Sequelize.TEXT
      },
      google_oauth_secret: {
        type: Sequelize.TEXT
      },
      passwords_key: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Settings');
  }
};