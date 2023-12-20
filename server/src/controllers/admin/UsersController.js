const { db } = require("../../database/models");

// Function for retrieving all users
const users = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await db.user.findAll();

    res.json(users);
  } catch (error) {
    res.code(500).json({ error: "Error fetching users" });
  }
};

module.exports = {
  users,
};