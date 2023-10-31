const { models } = require("../../database/");

// Function for retrieving all users
const users = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await models.user.findAll();

    res.json(users);
    console.log(users + "HI");
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

module.exports = {
  users,
};