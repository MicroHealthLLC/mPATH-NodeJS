'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('projects', [
      {
       name: 'Project1',
       description: "Project1 description",
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
        name: 'Project2',
        description: "Project2 description",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Project3',
        description: "Project3 description",
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
