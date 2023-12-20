const { db } = require("../database/models");

// Function for retrieving user details
const preferences = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    const preferences = require('../../static_responses/preferences.json');

    return({ preferences: preferences });

  } catch (error) {
    res.code(500).json({ error: "Error fetching data" });
  }
};

const current_user = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    const cu = require('../../static_responses/current_user.json');

    return({ current_user: cu });

  } catch (error) {
    res.code(500).json({ error: "Error fetching data" });
  }
};

module.exports = {
  preferences,
  current_user
};
