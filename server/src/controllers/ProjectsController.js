const { db } = require("../database/models");
const {_} = require("lodash") 
const qs = require('qs');

// Function for retrieving user details
const index = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    // const allProjects = await db.Project.findAll();
    const response = require('../../static_responses/projects_index.json');

    return({ projects: response });
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching lessons" });
  }
};

const show = async (req, res) => {
  try {
    const {getCurrentUser, printParams, compactAndUniq} = require('../utils/helpers.js')
    let body = qs.parse(req.body)
    let params = qs.parse(req.params)
    let query = qs.parse(req.query)
    printParams(req)

    var programId = params.id;
    // console.log(req.params)
    // console.log(db)
    // authorized facility_ids
    let user = await getCurrentUser(req.headers['x-token'])

    // Fetch all users from the database
    const program = await db.Project.findOne({where: { id: programId }  });
    
    let response = await program.build_json_response({user: user})

    //As response contains all data, we will add data in steps.
    // For now returning static response. and then will override 
    // the data with real data

    res.code(200)
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