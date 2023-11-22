const { db } = require("../database/models");

// Function for retrieving user details
const preferences = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    const preferences = require('../../static_responses/preferences.json');

    res.json({ preferences: preferences });

  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
};

module.exports = {
  preferences
};
