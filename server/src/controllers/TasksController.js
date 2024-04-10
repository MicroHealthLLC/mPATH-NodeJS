const { db } = require("../database/models");
const {_} = require("lodash") 
const {getCurrentUser, printParams, compactAndUniq} = require('../utils/helpers.js')


const show = async(req, res) => {
  try {
    console.log("**** show")
    let task = await db.Task.findOne({where: {id: req.params.id } })

    return({task: await task.toJSON()});
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching task " + error });
  }
}

// Function for retrieving user details
const create = async (req, res) => {
  try {
    var qs = require('qs');
    console.log("task body", req.body)
    console.log("task params", req.params)
    let params = qs.parse(req.body)
    let taskParams = params.task

    let task = db.Task.build();
    let user = await getCurrentUser(req.headers['x-token']) //await db.User.findOne({where: {email: 'admin@example.com'}})
    await task.createOrUpdateTask(params,{user: user, project_id: req.params.program_id, facility_id: req.params.project_id})

    return({task: await task.toJSON(), msg: "Task created successfully" });
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching task " + error });
  }
};
// Function for retrieving user details
const update = async (req, res) => {
  try {
    var qs = require('qs');
    console.log("task params", qs.parse(req.body))
    let params = qs.parse(req.body)
    let taskParams = params.task

    let task = await db.Task.findOne({where: {id: req.params.id } })
    task.set(taskParams)
    await task.save()

    await task.assignUsers(params)
    await task.manageNotes(taskParams)
    await task.manageChecklists(taskParams)
    await task.addResourceAttachment(params)

    // task = await task.update(params)
    // console.log("after update", task)

    return({task: await task.toJSON(), msg: "Task updated successfully" });
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching task " + error });
  }
};

const createDuplicate= async (req, res) => {
  try {
    const {getCurrentUser, printParams, compactAndUniq} = require('../utils/helpers.js')
    var qs = require('qs');
    let body = qs.parse(req.body)
    let params = qs.parse(req.params)
    let query = qs.parse(req.query)
    printParams(req)

    let task = await db.Task.findOne({where: {id: req.params.id }})
    let newTask = await task.createCopy()

    return({task: await newTask.toJSON(), msg: "Duplicate task created successfully" });

  }catch (error) {
    res.code(500)
    return({ error: "Error fetching task " + error });
  }
}

const createBulkDuplicate = async (req, res) => {
  try {
    const {getCurrentUser, printParams, compactAndUniq} = require('../utils/helpers.js')
    var qs = require('qs');
    let body = qs.parse(req.body)
    let params = qs.parse(req.params)
    let query = qs.parse(req.query)
    printParams(req)

    let task = await db.Task.findOne({where: {id: req.params.id }})
    let allResources = []
    let qFacilityProjectIds = query.facility_project_ids
    let qProjectContractIds = query.project_contract_ids
    let qProjectContractVehicleIds = query.project_contract_vehicle_ids
    
    var newResource 

    if(qFacilityProjectIds){
      for(var qfp of qFacilityProjectIds){
        newResource = await task.createCopy({facilityProjectId: qfp})
        allResources.push(await newResource.toJSON())
      } 
    }

    if(qProjectContractIds){
      for(var qfp of qProjectContractIds){
        newResource = await task.createCopy({projectContractId: qfp})
        allResources.push(await newResource.toJSON())
      }
    }

    if(qProjectContractVehicleIds){
      for(var qfp of qProjectContractVehicleIds){
        newResource = await task.createCopy({projectContractVehicleId: qfp})
        allResources.push(await newResource.toJSON())
      }
    }

    return({tasks: allResources, msg: 'Bulk duplicate task created successfully'});

  }catch (error) {
    res.code(500)
    return({ error: "Error fetching task " + error });
  }
}


const destroy = async (req, res) => {
  try {
    const {getCurrentUser, printParams, compactAndUniq} = require('../utils/helpers.js')
    var qs = require('qs');
    let body = qs.parse(req.body)
    let params = qs.parse(req.params)
    let query = qs.parse(req.query)
    printParams(req)

    let task = await db.Task.findOne({where: {id: req.params.id }})
    var resJSON = await task.toJSON()
    await task.destroy()

    return({task: resJSON, msg: "Task destroy successfully" });

  }catch (error) {
    res.code(500)
    return({ error: "Error fetching task " + error });
  }
}


module.exports = {
  update,
  show,
  create,
  createDuplicate,
  destroy,
  createBulkDuplicate
};