const { db } = require("../database/models");
const {_} = require("lodash") 
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
    response.contracts = await program.getContracts()
    response.contract_vehicles = await program.getContractVehicles()
    facility_groups = await program.getFacilityGroups()
    response.facility_groups = _.uniqWith(facility_groups, function(x,y){ return x.id == y.id} );
    response.task_types = await program.getTaskTypes()
    response.issue_types = await program.getIssueTypes()
    response.issue_severities = await program.getIssueSeverities()
    response.task_stages= await program.getTaskStages()
    response.issue_stages = await program.getIssueStages()
    response.risk_stages = await program.getRiskStages()
    response.lesson_stages = await program.getLessonStages()
    response.contract_types = await db.ContractType.findAll()
    response.contract_statues = await db.ContractStatus.findAll()
    response.contract_customers = await db.ContractCustomer.findAll()
    response.contract_vehicle_numbers = await db.ContractVehicleNumber.findAll()
    response.contract_numbers = await db.ContractNumber.findAll()
    response.subcontract_numbers = await db.SubcontractNumber.findAll()
    response.contract_primes = await db.ContractPrime.findAll()
    response.contract_current_pops = await db.ContractCurrentPop.findAll()
    response.contract_classifications = await db.ContractClassification.findAll()

    //As response contains all data, we will add data in steps.
    // For now returning static response. and then will override 
    // the data with real data
    // response = require('../../static_responses/project_show.json');

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
