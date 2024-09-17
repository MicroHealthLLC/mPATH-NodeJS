'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add altering commands here.
//      *
//      * Example:
//      * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
//      */
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add reverting commands here.
//      *
//      * Example:
//      * await queryInterface.dropTable('users');
//      */
//   }
// };
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     // Remove existing foreign key constraint if it exists
//     await queryInterface.removeConstraint("issue_users", "fk_rails_a68dc2b01f");

//     // Add foreign key constraint to issue_users table referencing issues table with cascade delete
//     await queryInterface.addConstraint("issue_users", {
//       fields: ["issue_id"],
//       type: "foreign key",
//       name: "fk_issue_id_issue_users",
//       references: {
//         table: "issues",
//         field: "id",
//       },
//       onDelete: "CASCADE", // Add onDelete option for cascade delete
//       onUpdate: "CASCADE", // Add onUpdate option for cascade update if needed
//     });
//   },

//   async down(queryInterface, Sequelize) {
//     // Remove foreign key constraint during rollback
//     await queryInterface.removeConstraint("issue_users", "fk_issue_id_issue_users");

//     // Re-add the previous foreign key constraint if necessary
//     await queryInterface.addConstraint("issue_users", {
//       fields: ["issue_id"],
//       type: "foreign key",
//       name: "fk_rails_a68dc2b01f",
//       references: {
//         table: "issues",
//         field: "id",
//       },
//     });
//   },
// };

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Attempt to remove the foreign key constraint if it exists, handle the error if it doesn't exist
    try {
      await queryInterface.removeConstraint("issue_users", "fk_rails_a68dc2b01f");
      console.log("Constraint fk_rails_a68dc2b01f removed.");
    } catch (error) {
      console.log("Constraint fk_rails_a68dc2b01f does not exist, skipping removal.");
    }

    // Add the new foreign key constraint with cascade delete
    await queryInterface.addConstraint("issue_users", {
      fields: ["issue_id"],
      type: "foreign key",
      name: "fk_issue_id_issue_users",
      references: {
        table: "issues",
        field: "id",
      },
      onDelete: "CASCADE", // Add onDelete option for cascade delete
      onUpdate: "CASCADE", // Add onUpdate option for cascade update if needed
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the foreign key constraint added in the up method
    await queryInterface.removeConstraint("issue_users", "fk_issue_id_issue_users");

    // Optionally, re-add the previous foreign key constraint if needed during rollback
    await queryInterface.addConstraint("issue_users", {
      fields: ["issue_id"],
      type: "foreign key",
      name: "fk_rails_a68dc2b01f",
      references: {
        table: "issues",
        field: "id",
      },
    });
  },
};
