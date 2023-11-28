const { db } = require("../database/models");

// Function for retrieving user details
const program_admin_programs = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    const program_admin_programs = require('../../static_responses/program_admin_programs.json');

    res.json({ portfolio_filters: program_admin_programs });

  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
};

module.exports = {
  program_admin_programs
};
