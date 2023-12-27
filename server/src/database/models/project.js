'use strict';

const {_} = require("lodash") 

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // define association here
      // this.hasMany(models.ProjectUser)
      // this.belongsToMany(models.User,{ through: models.ProjectUser})
      this.hasMany(models.FacilityProject)

      // this.belongsToMany(models.Facility,{ through: models.FacilityProject })
      // this.belongsToMany(models.FacilityGroup,{ through: models.FacilityProject })
      
      // this.hasMany(models.ProjectFacilityGroup,{foreignKey: 'project_id' })
      
      // // this.belongsToMany(models.ProjectGroup,{through: models.ProjectFacilityGroup, foreignKey: 'project_id' })
      // // this.belongsToMany(models.Issue,{through: models.FacilityProject, foreignKey: 'project_id' })
      // // this.belongsToMany(models.Risk,{through: models.FacilityProject, foreignKey: 'project_id' })
      // // this.belongsToMany(models.Lesson,{through: models.FacilityProject, as: "ProjectLesson", foreignKey: 'project_id', otherKey: 'facility_id'  })
      
      // this.belongsTo(models.ProjectType)

      // this.hasMany(models.ProjectStatus)
      // this.belongsToMany(models.Status,{through: models.ProjectStatus, foreignKey: 'project_id' })
      // this.hasMany(models.ProjectTaskType)
      // this.belongsToMany(models.TaskType,{ through: models.ProjectTaskType, foreignKey: 'project_id' })
      // this.hasMany(models.ProjectIssueType)
      // this.belongsToMany(models.IssueType,{ through: models.ProjectIssueType, foreignKey: 'project_id' })
      
      // this.hasMany(models.ProjectIssueSeverity)
      // this.belongsToMany(models.IssueSeverity,{through: models.ProjectIssueSeverity, foreignKey: 'project_id' })

      // this.hasMany(models.ProjectTaskStage)
      // this.belongsToMany(models.TaskStage,{through: models.ProjectTaskStage, foreignKey: 'project_id' })
      // this.hasMany(models.ProjectRiskStage)
      // this.belongsToMany(models.RiskStage,{through: models.ProjectRiskStage, foreignKey: 'project_id' })

      // this.hasMany(models.ProjectIssueStage)
      // this.belongsToMany(models.IssueStage,{through: models.ProjectIssueStage, foreignKey: 'project_id' })
      // this.hasMany(models.FavoriteFilter)
      // this.hasMany(models.QueryFilter)

      // this.hasMany(models.ProjectLessonStage)
      // this.belongsToMany(models.LessonStage,{through: models.ProjectLessonStage, foreignKey: 'project_id' })
      // this.hasMany(models.Contract)
      // this.hasMany(models.Role)
      // this.hasMany(models.RoleUser)
      this.hasMany(models.ProjectContract)
      // this.belongsToMany(models.ContractProjectDatum,{through: models.ProjectContract, foreignKey: 'project_id' })
      // this.hasMany(models.ProjectContractVehicle)
      // this.belongsToMany(models.ContractVehicle,{ through: models.ProjectContractVehicle,foreignKey: 'project_id' })
      // // this.hasMany(models.ProjectContractVehicleGroup)

    }

    async build_json_response(options){
      const { db } = require("./index.js");

      console.log("####### build_json_response")
      let response = this.toJSON()
      let facility_projects = await this.getFacilityProjects()
      response.facilities = []

      let facility_project_ids = []
      let facility_ids = []
      for(var facility_project of facility_projects){

        let facility_hash = facility_project.toJSON()
        facility_project_ids.push(facility_project.id)
        facility_ids.push(facility_project.facility_id)

        // Adding Task Data
        // facility_hash.facility = await facility_project.getFacility()
        facility_hash.tasks = [] 

        var tasks = await db.Task.findAll({where: {facility_project_id: facility_project_ids} })
        var task_ids = tasks.map(function(e){return e.id})
        var checklists = await db.Checklist.findAll({where: {listable_id: task_ids, listable_type: 'Task'}})
        var checklist_ids = checklists.map(function(e){return e.id})
        var progress_lists = await db.ProgressList.findAll({where: {checklist_id: checklist_ids}})

        for(var task of tasks){
          let _task = task.toJSON()

          let _tchecklists = []
          for(var i = 0; i < checklists.length; i++ ){

            if(checklists[i].listable_id == _task.id){

              let c = checklists[i].toJSON()
              c.progress_lists = []
              c.user = {id: c.user_id, full_name: ""}
              for(var k = 0; k < progress_lists.length; k++ ){
                if(progress_lists[k].checklist_id == c.id){
                  let p = progress_lists[k].toJSON()
                  p.user = {id: p.user_id, full_name: ""}
                  c.progress_lists.push(p)
                }
              }
              _tchecklists.push(c)
              console.log("################# _tchecklists", _tchecklists)

            }
          }   

          _task.checklists = _tchecklists
          // _task.checklists = await task.getListable({include: [db.ProgressList, db.User]})
          facility_hash.tasks.push(_task)
        }

        // Adding issues data
        facility_hash.issues = [] 

        var issues = await db.Issue.findAll({where: {facility_project_id: facility_project_ids} })
        var issue_ids = issues.map(function(e){return e.id})
        var checklists = await db.Checklist.findAll({where: {listable_id: issue_ids, listable_type: 'Issue'}})
        var checklist_ids = checklists.map(function(e){return e.id})
        var progress_lists = await db.ProgressList.findAll({where: {checklist_id: checklist_ids}})

        for(var issue of issues){
          let _issue = issue.toJSON()

          let _tchecklists = []
          for(var i = 0; i < checklists.length; i++ ){

            if(checklists[i].listable_id == _issue.id){

              let c = checklists[i].toJSON()
              c.progress_lists = []
              c.user = {id: c.user_id, full_name: ""}
              for(var k = 0; k < progress_lists.length; k++ ){
                if(progress_lists[k].checklist_id == c.id){
                  let p = progress_lists[k].toJSON()
                  p.user = {id: p.user_id, full_name: ""}
                  c.progress_lists.push(p)
                }
              }
              _tchecklists.push(c)
              console.log("################# _tchecklists", _tchecklists)

            }
          }   

          _issue.checklists = _tchecklists
          // _task.checklists = await task.getListable({include: [db.ProgressList, db.User]})
          facility_hash.issues.push(_issue)
        }


        // Adding risk data
        facility_hash.risks = [] 

        var risks = await db.Risk.findAll({where: {facility_project_id: facility_project_ids} })
        var risk_ids = risks.map(function(e){return e.id})
        var checklists = await db.Checklist.findAll({where: {listable_id: issue_ids, listable_type: 'Risk'}})
        var checklist_ids = checklists.map(function(e){return e.id})
        var progress_lists = await db.ProgressList.findAll({where: {checklist_id: checklist_ids}})

        for(var risk of risks){
          let _risk = risk.toJSON()

          let _tchecklists = []
          for(var i = 0; i < checklists.length; i++ ){

            if(checklists[i].listable_id == _risk.id){

              let c = checklists[i].toJSON()
              c.progress_lists = []
              c.user = {id: c.user_id, full_name: ""}
              for(var k = 0; k < progress_lists.length; k++ ){
                if(progress_lists[k].checklist_id == c.id){
                  let p = progress_lists[k].toJSON()
                  p.user = {id: p.user_id, full_name: ""}
                  c.progress_lists.push(p)
                }
              }
              _tchecklists.push(c)
              console.log("################# _tchecklists", _tchecklists)

            }
          }   

          _risk.checklists = _tchecklists
          // _task.checklists = await task.getListable({include: [db.ProgressList, db.User]})
          facility_hash.risks.push(_risk)
        }


        // facility_hash.risks = await db.Risk.findAll({where: {facility_project_id: facility_project_ids} })

        response.facilities.push(facility_hash)
      }

      // response.users = await  this.getUsers({
      //   attributes: ['id','email', 'first_name', 'last_name', 'title', 'phone_number', 'status', 'full_name']
      // })
      // response.project_users = await  this.getProjectUsers()
      // response.contracts = await this.getContracts()
      let project_contracts = await this.getProjectContracts()

      // response.contract_vehicles = await this.getContractVehicles()
      // let facility_groups = await this.getFacilityGroups()
      // response.facility_groups = _.uniqWith(facility_groups, function(x,y){ return x.id == y.id} );
      // response.task_types = await this.getTaskTypes()
      // response.issue_types = await this.getIssueTypes()
      // response.issue_severities = await this.getIssueSeverities()
      // response.task_stages= await this.getTaskStages()
      // response.issue_stages = await this.getIssueStages()
      // response.risk_stages = await this.getRiskStages()
      // response.lesson_stages = await this.getLessonStages()

      response.contract_types = await db.ContractType.findAll()
      response.contract_statues = await db.ContractStatus.findAll()
      response.contract_customers = await db.ContractCustomer.findAll()
      response.contract_vehicle_numbers = await db.ContractVehicleNumber.findAll()
      response.contract_numbers = await db.ContractNumber.findAll()
      response.subcontract_numbers = await db.SubcontractNumber.findAll()
      response.contract_primes = await db.ContractPrime.findAll()
      response.contract_current_pops = await db.ContractCurrentPop.findAll()
      response.contract_classifications = await db.ContractClassification.findAll()

      return response
    }
  }
  Project.init({
    name: { type: DataTypes.STRING },
    description: DataTypes.TEXT,
    uuid: DataTypes.STRING,
    project_type_id: DataTypes.STRING,
    status: DataTypes.STRING,
    progress: DataTypes.STRING
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'projects',
    modelName: 'Project',
    underscored: true

  });
  return Project;
};