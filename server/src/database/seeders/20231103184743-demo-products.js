'use strict';

/** @type {import('sequelize-cli').Migration} */
const {db} = require("../models")
var bcrypt = require('bcrypt');

function cryptPassword (password, callback) {
  bcrypt.genSalt(10, function(err, salt) {
   if (err) 
     return callback(err);

   bcrypt.hash(password, salt, function(err, hash) {
     return callback(err, hash);
   });
 });
};

function comparePassword(plainPass, hashword, callback) {
  bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {   
      return err == null ?
          callback(null, isPasswordMatch) :
          callback(err);
  });
};
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

    const [user, created] = await db.User.findOrCreate({
      where: { email: 'admin@example.com' },
      defaults: {
        encrypted_password: cryptPassword('adminPa$$w0rd'),
        title: 'Mr.',
        first_name: 'Super',
        role:  1,
        last_name: 'Admin'
      }
    });

    if (created) {
      console.log("User created successfully"); // This will certainly be 'Technical Lead JavaScript'
    }else{
      console.log("Error creating user");
    }

    // await queryInterface.bulkInsert('projects', [
    //   {
    //     name: 'Project1',
    //     description: "Project1 description",
    //     created_at: new Date(),
    //     updated_at: new Date()
    //   },
    //   {
    //     name: 'Project2',
    //     description: "Project2 description",
    //     created_at: new Date(),
    //     updated_at: new Date()
    //   },
    //   {
    //     name: 'Project3',
    //     description: "Project3 description",
    //     created_at: new Date(),
    //     updated_at: new Date()
    //   }
    // ], {});

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
