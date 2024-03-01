const { db } = require("../database/models");
const {_} = require("lodash") 
// Function for retrieving user details
const index = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    // const allProjects = await db.Project.findAll();
    const response = require('../../static_responses/projects_index.json');

    return({ projects: response });
  } catch (error) {
    res.code(500).json({ error: "Error fetching lessons" });
  }
};

const show = async (req, res) => {
  try {
    var programId = req.params.id;
    // console.log(req.params)
    // console.log(db)
    // authorized facility_ids
    let user = await db.User.findOne({where: {email: 'admin@example.com'}})
    // Fetch all users from the database
    const program = await db.Project.findOne(
      
      // { raw: true },
      {  
        where: { id: programId }
      }
    );
    
    let response = await program.build_json_response({user: user})

    //As response contains all data, we will add data in steps.
    // For now returning static response. and then will override 
    // the data with real data
    // response = require('../../static_responses/project_show.json');
    res.type('application/json').code(200)
    return({ project: response });
    // console.log("Program: ", program);
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching program " + error.stack });
  }
};

const project_facility_hash = async (req, res) => {
  try {

    //As response contains all data, we will add data in steps.
    // For now returning static response. and then will override 
    // the data with real data
    response = require('../../static_responses/project_facility_hash.json');
    res.type('application/json').code(200)
    return( response );
    // console.log("Program: ", program);
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching program " + error });
  }
};

module.exports = {
  index,
  show,
  project_facility_hash
};