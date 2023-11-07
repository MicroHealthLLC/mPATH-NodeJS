'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('users', 'encrypted_password', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.addColumn('users', 'reset_password_token', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'reset_password_sent_at', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'sign_in_count', {
          type: Sequelize.DataTypes.INTEGER,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'current_sign_in_at', {
          type: Sequelize.DataTypes.DATE,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'last_sign_in_at', {
          type: Sequelize.DataTypes.DATE,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'current_sign_in_ip', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'last_sign_in_ip', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'first_name', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'last_name', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'title', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'phone_number', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'address', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'role', {
          type: Sequelize.DataTypes.INTEGER,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'provider', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'uid', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'login', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'status', {
          type: Sequelize.DataTypes.INTEGER,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'lat', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'lng', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'country_code', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'color', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'organization_id', {
          type: Sequelize.DataTypes.INTEGER,
        }, { transaction: t }),

        queryInterface.addColumn('projects', 'uuid', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('projects', 'project_type_id', {
          type: Sequelize.DataTypes.INTEGER,
        }, { transaction: t }),
        queryInterface.addColumn('projects', 'status', {
          type: Sequelize.DataTypes.INTEGER,
        }, { transaction: t }),
        queryInterface.addColumn('projects', 'progress', {
          type: Sequelize.DataTypes.INTEGER,
        }, { transaction: t })
        
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('projects', 'uuid', { transaction: t }),
        queryInterface.removeColumn('projects', 'project_type_id', { transaction: t }),
        queryInterface.removeColumn('projects', 'status', { transaction: t }),
        queryInterface.removeColumn('projects', 'progress', { transaction: t }),

        queryInterface.removeColumn('users', 'encrypted_password', { transaction: t }),
        queryInterface.removeColumn('users', 'reset_password_token', { transaction: t }),
        queryInterface.removeColumn('users', 'reset_password_sent_at', { transaction: t }),
        queryInterface.removeColumn('users', 'sign_in_count', { transaction: t }),
        queryInterface.removeColumn('users', 'current_sign_in_at', { transaction: t }),
        queryInterface.removeColumn('users', 'last_sign_in_at', { transaction: t }),
        queryInterface.removeColumn('users', 'current_sign_in_ip', { transaction: t }),
        queryInterface.removeColumn('users', 'last_sign_in_ip', { transaction: t }),
        queryInterface.removeColumn('users', 'first_name', { transaction: t }),
        queryInterface.removeColumn('users', 'last_name', { transaction: t }),
        queryInterface.removeColumn('users', 'title', { transaction: t }),
        queryInterface.removeColumn('users', 'phone_number', { transaction: t }),
        queryInterface.removeColumn('users', 'address', { transaction: t }),
        queryInterface.removeColumn('users', 'role', { transaction: t }),
        queryInterface.removeColumn('users', 'provider', { transaction: t }),
        queryInterface.removeColumn('users', 'uid', { transaction: t }),
        queryInterface.removeColumn('users', 'login', { transaction: t }),
        queryInterface.removeColumn('users', 'status', { transaction: t }),
        queryInterface.removeColumn('users', 'lat', { transaction: t }),
        queryInterface.removeColumn('users', 'lng', { transaction: t }),
        queryInterface.removeColumn('users', 'country_code', { transaction: t }),
        queryInterface.removeColumn('users', 'color', { transaction: t }),
        queryInterface.removeColumn('users', 'organization_id', { transaction: t })
      ])
    });
  }
}
