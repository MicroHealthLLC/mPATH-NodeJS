const { db } = require("../database/models");

// Function for retrieving user details
const index = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    const allProjects = await db.Project.findAll();
    res.json({ allProjects: allProjects });
  } catch (error) {
    res.status(500).json({ error: "Error fetching lessons" });
  }
};

const show = async (req, res) => {
  try {
    programId = req.params.id;
    // console.log(req.params)
    // console.log(db)
    // Fetch all users from the database
    const program = await db.Project.findOne(
      { raw: true },
      { where: { id: programId } }
    );
    //As response contains all data, we will add data in steps.
    // For now returning static response. and then will override 
    // the data with real data
    const response = require('../../static_responses/project_show.json');

    res.json({ project: response });
    // console.log("Program: ", program);
  } catch (error) {
    res.status(500).json({ error: "Error fetching program" + error });
  }
};

module.exports = {
  index,
  show,
};
