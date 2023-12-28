const { db } = require("../database/models");

// Function for retrieving user details
const query_filters = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    const qf = require('../../static_responses/query_filters.json');
    res.type('application/json').code(200)
    return(qf);

  } catch (error) {
    res.code(500)
    return({ error: "Error fetching data" });
  }
};


module.exports = {
  query_filters
};
