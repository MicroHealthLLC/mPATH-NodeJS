const { db } = require("../database/models");

// Function for retrieving user details
const get_user_privileges = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    const get_user_privileges = require('../../static_responses/get_user_privileges.json');

    return(get_user_privileges);

  } catch (error) {
    res.code(500).json({ error: "Error fetching data" });
  }
};

module.exports = {
  get_user_privileges
};
