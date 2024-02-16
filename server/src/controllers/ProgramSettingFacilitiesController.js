const { db } = require("../database/models");
const qs = require('qs');
const {_} = require("lodash") 
const {getCurrentUser, printParams} = require('../utils/helpers.js')

async function index(req, res) {
  try {
    let responseHash = {};

    let params = qs.parse(req.query)
    console.log("Token ", req.headers)
    if(params.project_id){
      let project = await db.Project.findOne({where: {id: params.project_id}})
      let facility_projects = await db.FacilityProject.findAll({where: {project_id: project.id}})
      let facility_ids = _.uniq(_.map(facility_projects,function(fp){return fp.facility_id}))
      responseHash[project.id] = {facility_ids:facility_ids }
    }
    
    if(params.all == 'true'){
      let user = await getCurrentUser(req.headers['x-token'])
      let project_users = await db.ProjectUser.findAll({where: {user_id: user.id}})
      let project_ids = _.uniq(_.map(project_users, function(pu){return pu.project_id}))
      let projects = await db.Project.findAll({where: {id: project_ids}})
      let facility_projects = await db.FacilityProject.findAll({where: {project_id: project.id}})
      let facility_project_group_by = _.groupBy(facility_projects, 'project_id') 
      for(var project of projects){
        var fps = facility_project_group_by[project.id.toString()]
        responseHash[project.id] = {facility_ids: [] }
        if(fps){
          var facility_ids =  _.uniq(_.map(facility_projects,function(fp){return fp.facility_id}))
          responseHash[project.id] = {facility_ids: facility_ids }
        }        
      }
    }
    let all_facilities = await db.Facility.findAll()
    responseHash.facilities = []
    for(var facility of all_facilities){
      var f = await facility.toJSON()
      responseHash.facilities.push(f)
    }

    return(responseHash)
  } catch (error) {
    res.status(500)
    return({ error: "Error fetching facility groups "+ error });
  }
}
async function create(req, res) {
  try {
    const { db } = require("../database/models");

    let body = qs.parse(req.body)
    let params = qs.parse(req.params)
    let query = qs.parse(req.query)
    printParams(req)

    let user = await getCurrentUser(req.headers['x-token'])
    let project = await db.Project.findOne({where: {id: query.project_id}})
    let facility = db.Facility.build()
    facility.setAttributes(body.facility)
    facility.status = 1
    facility.creator_id = user.id
    facility.is_portfolio = false
    await facility.save()
    let facilityProject = db.FacilityProject.build({facility_id: facility.id, project_id: project.id })

    if(body.facility.facility_group_id){
      facilityProject.facility_group_id = body.facility.facility_group_id
    }
    await facilityProject.save()

    return({facility});
  } catch (error) {
    res.status(406)
    return({ error: "Error "+error });
  }
}
async function show(req, res) {

}
async function bulkProjectsUpdate(req, res) {

}
async function removeFacilityProject(req, res) {

}
async function update(req, res) {

}
async function destroy(req, res) {

}

module.exports = {
  index,
  create,
  show,
  bulkProjectsUpdate,
  removeFacilityProject,
  update,
  destroy
};