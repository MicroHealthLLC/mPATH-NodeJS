const { db } = require("../database/models");

// Function for retrieving user details
const program_setting_role = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    const program_setting_role = require('../../static_responses/program_setting_role.json');

    res.json({ program_setting_role: program_setting_role });

  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
};

module.exports = {
  program_setting_role
};
