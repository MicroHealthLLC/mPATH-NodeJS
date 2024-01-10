const { db } = require("../database/models");
const {_} = require("lodash") 
// Function for retrieving user details
const update = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    // const allProjects = await db.Project.findAll();
    const response = require('../../static_responses/projects_index.json');

    return({ projects: response });
  } catch (error) {
    res.code(500).json({ error: "Error fetching lessons" });
  }
};

module.exports = {
  update
};