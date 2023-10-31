require('dotenv').config();
// sync-database.js
const sequelize = require('./database');

async function syncDatabase() {
  try {
    await sequelize.sync(); // Use { force: true } to drop existing tables and recreate them
    console.log('Tables synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing tables:', error);
  } finally {
    // Close the database connection when synchronization is complete
    await sequelize.close();
  }
}

// Call the syncDatabase function to run the synchronization once
syncDatabase();