const { db } = require("../database/models");

// Function for retrieving user details
const query_filters = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    const qf = require('../../static_responses/query_filters.json');
    res.json(qf);

  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
};

module.exports = {
  query_filters
};
