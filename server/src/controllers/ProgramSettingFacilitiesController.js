const { db } = require("../database/models");
const qs = require('qs');
const {_} = require("lodash") 
const {getCurrentUser} = require('../utils/helpers.js')

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

module.exports = {
  index
};