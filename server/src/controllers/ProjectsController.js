const { db } = require("../database/models");

// Function for retrieving user details
const index = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    // const allProjects = await db.Project.findAll();
    const response = require('../../static_responses/projects_index.json');

    res.json({ projects: response });
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
      
      // { raw: true },
      {  
        where: { id: programId }
      }
    );
    response = program.toJSON()
    response.users = await  program.getUsers()
    response.project_users = await  program.getProjectUsers()
    response.facilities = await program.getFacilities()
    response.contracts = []
    response.contract_vehicles = []
    response.facility_groups = []
    response.task_types = []
    response.issue_types = []
    response.issue_severities = []
    response.task_stages = []
    response.issue_stages = []
    response.risk_stages = []
    response.lesson_stages = []
    response.contract_types = []
    response.contract_statues = []
    response.contract_customers = []
    response.contract_vehicle_numbers = []
    response.contract_numbers = []
    response.subcontract_numbers = []
    response.contract_primes = []
    response.contract_current_pops = []
    response.contract_classifications = []

    //As response contains all data, we will add data in steps.
    // For now returning static response. and then will override 
    // the data with real data
    // const response = require('../../static_responses/project_show.json');

    res.json({ project: response });
    // console.log("Program: ", program);
  } catch (error) {
    res.status(500).json({ error: "Error fetching program " + error });
  }
};

module.exports = {
  index,
  show,
};
