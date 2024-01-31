'use strict';

const {_} = require("lodash") 

const {
  Op, Model, QueryTypes
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
      this.hasMany(models.ProjectUser)
      // this.belongsToMany(models.User,{ through: models.ProjectUser})
      this.hasMany(models.FacilityProject)

      // this.belongsToMany(models.Facility,{ through: models.FacilityProject })
      // this.belongsToMany(models.FacilityGroup,{ through: models.FacilityProject })
      
      this.hasMany(models.ProjectFacilityGroup,{foreignKey: 'project_id' })
      
      // // this.belongsToMany(models.ProjectGroup,{through: models.ProjectFacilityGroup, foreignKey: 'project_id' })
      // // this.belongsToMany(models.Issue,{through: models.FacilityProject, foreignKey: 'project_id' })
      // // this.belongsToMany(models.Risk,{through: models.FacilityProject, foreignKey: 'project_id' })
      // // this.belongsToMany(models.Lesson,{through: models.FacilityProject, as: "ProjectLesson", foreignKey: 'project_id', otherKey: 'facility_id'  })
      
      // this.belongsTo(models.ProjectType)

      this.hasMany(models.ProjectStatus)
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
      this.hasMany(models.ProjectContractVehicle)
      // this.belongsToMany(models.ContractVehicle,{ through: models.ProjectContractVehicle,foreignKey: 'project_id' })
      // // this.hasMany(models.ProjectContractVehicleGroup)

    }
    toJSON() {
      let h = {...super.toJSON()}
      h['status'] = this.getStatus(h['status']) 
      return h;
    }
    getStatus(v){
      return {
        0: 'inactive', 1: 'active'
      }[v]   
    }
    async build_json_response(options){
      const { db } = require("./index.js");

      console.log("####### build_json_response")
      let response = this.toJSON()
      let all_tasks = []
      let all_issues = []
      let all_risks = []

      let user = options.user
      // let role_users = await db.RoleUser.findAll({where: {user_id: user.id}})
      // let role_ids = _.uniq(_.map(role_users, function(f){ return f.role_id } ))
      // let role_privileges = await db.RolePrivilege.findAll({
      //   where: { 
      //     role_id: role_ids, 
      //     privilege: { 
      //       [Op.regexp]: "^[RWD]" 
      //     }
      //   },
      // });
      // let role_privilege_role_ids = _.uniq(_.map(role_privileges, function(f){ return f.role_id } ))
      // let role_users2 = await db.RoleUser.findAll({where: {user_id: user.id, role_id: role_privilege_role_ids}})
      // let authorized_facility_project_ids = _.uniq(_.map(role_users2, function(f){ return f.facility_project_id } ))
      // let authorized_project_contract_ids = _.uniq(_.map(role_users2, function(f){ return f.project_contract_id } ))
      // let authorized_project_contract_vehicle_ids = _.uniq(_.map(role_users2, function(f){ return f.project_contract_vehicle_id } ))

      let authorized_data = await user.getAuthorizedData()
      let authorized_facility_project_ids = authorized_data.authorized_facility_project_ids
      let authorized_project_contract_ids = authorized_data.authorized_project_contract_ids
      let authorized_project_contract_vehicle_ids = authorized_data.authorized_project_contract_vehicle_ids
      let sql_result = ''

      let facility_project_ids_with_project_tasks = []
      let facility_project_ids_with_project_issues = []
      let facility_project_ids_with_project_risks = []
      let facility_project_ids_with_project_lessons = []
      let facility_project_ids_with_project_notes =  []

      if(authorized_facility_project_ids.length > 0){
        sql_result = await sequelize.query(
          "SELECT distinct(facility_project_id), role_type FROM `role_users` INNER JOIN `roles` ON `roles`.`id` = `role_users`.`role_id` INNER JOIN `role_privileges` ON `role_privileges`.`role_id` = `roles`.`id` WHERE `role_users`.`user_id` = 1 AND (role_privileges.privilege REGEXP '^[RWD]' and role_users.facility_project_id in (:facility_project_ids))",
          {
            replacements: { facility_project_ids: authorized_facility_project_ids },
            type: QueryTypes.SELECT
          }
        );
        facility_project_ids_with_project_tasks = _.uniq(_.map(sql_result, function(s){return s.facility_project_id && s.role_type == db.RolePrivilege.PROJECT_TASKS }) )
        facility_project_ids_with_project_issues = _.uniq(_.map(sql_result, function(s){return s.facility_project_id && s.role_type == db.RolePrivilege.PROJECT_ISSUES }) )
        facility_project_ids_with_project_risks = _.uniq(_.map(sql_result, function(s){return s.facility_project_id && s.role_type == db.RolePrivilege.PROJECT_RISKS }) )
        facility_project_ids_with_project_lessons = _.uniq(_.map(sql_result, function(s){return s.facility_project_id && s.role_type == db.RolePrivilege.PROJECT_LESSONS }) )
        facility_project_ids_with_project_notes = _.uniq(_.map(sql_result, function(s){return s.facility_project_id && s.role_type == db.RolePrivilege.PROJECT_NOTES }) )
      }

      let project_contract_ids_with_contract_tasks = []
      let project_contract_ids_with_contract_issues = []
      let project_contract_ids_with_contract_risks = []
      let project_contract_ids_with_contract_lessons = []
      let project_contract_ids_with_contract_notes = []

      if(authorized_project_contract_ids.length > 0){
        sql_result = await sequelize.query(
          "SELECT distinct(project_contract_id), role_type FROM `role_users` INNER JOIN `roles` ON `roles`.`id` = `role_users`.`role_id` INNER JOIN `role_privileges` ON `role_privileges`.`role_id` = `roles`.`id` WHERE `role_users`.`user_id` = 1 AND (role_privileges.privilege REGEXP '^[RWD]' and role_users.project_contract_id in (:project_contract_ids))",
          {
            replacements: { project_contract_ids: authorized_project_contract_ids },
            type: QueryTypes.SELECT
          }
        );
  
        project_contract_ids_with_contract_tasks = _.uniq(_.map(sql_result, function(s){return s.project_contract_id && s.role_type == db.RolePrivilege.CONTRACT_TASKS }) )
        project_contract_ids_with_contract_issues = _.uniq(_.map(sql_result, function(s){return s.project_contract_id && s.role_type == db.RolePrivilege.CONTRACT_ISSUES }) )
        project_contract_ids_with_contract_risks = _.uniq(_.map(sql_result, function(s){return s.project_contract_id && s.role_type == db.RolePrivilege.CONTRACT_RISKS }) )
        project_contract_ids_with_contract_lessons = _.uniq(_.map(sql_result, function(s){return s.project_contract_id && s.role_type == db.RolePrivilege.CONTRACT_LESSONS }) )
        project_contract_ids_with_contract_notes = _.uniq(_.map(sql_result, function(s){return s.project_contract_id && s.role_type == db.RolePrivilege.CONTRACT_NOTES }) )
      }

      let project_contract_vehicle_ids_with_contract_tasks = []
      let project_contract_vehicle_ids_with_contract_issues =  []
      let project_contract_vehicle_ids_with_contract_risks = []
      let project_contract_vehicle_ids_with_contract_notes = []

      if(authorized_project_contract_vehicle_ids.length > 0){
        sql_result = await sequelize.query(
          "SELECT distinct(project_contract_vehicle_id), role_type FROM `role_users` INNER JOIN `roles` ON `roles`.`id` = `role_users`.`role_id` INNER JOIN `role_privileges` ON `role_privileges`.`role_id` = `roles`.`id` WHERE `role_users`.`user_id` = 1 AND (role_privileges.privilege REGEXP '^[RWD]' and role_users.project_contract_vehicle_id in (:project_contract_vehicle_ids))",
          {
            replacements: { project_contract_vehicle_ids: authorized_project_contract_vehicle_ids },
            type: QueryTypes.SELECT
          }
        );
  
        project_contract_vehicle_ids_with_contract_tasks = _.uniq(_.map(sql_result, function(s){return s.project_contract_vehicle_id && s.role_type == db.RolePrivilege.CONTRACT_TASKS }) )
        project_contract_vehicle_ids_with_contract_issues = _.uniq(_.map(sql_result, function(s){return s.project_contract_vehicle_id && s.role_type ==db. RolePrivilege.CONTRACT_ISSUES }) )
        project_contract_vehicle_ids_with_contract_risks = _.uniq(_.map(sql_result, function(s){return s.project_contract_vehicle_id && s.role_type == db.RolePrivilege.CONTRACT_RISKS }) )
        project_contract_vehicle_ids_with_contract_notes = _.uniq(_.map(sql_result, function(s){return s.project_contract_vehicle_id && s.role_type == db.RolePrivilege.CONTRACT_NOTES }) )
  
      }

      // Facilities
      response.facilities = []
      let facility_projects = await db.FacilityProject.findAll({where: {project_id: this.id, id: authorized_facility_project_ids}})
      let facility_project_ids = _.uniq(_.map(facility_projects, function(f){ return f.id } ))
      let facility_ids = _.uniq( _.map(facility_projects, function(f){ return f.facility_id } ))
      let facility_group_ids = _.uniq(_.map(facility_projects, function(f){ return f.facility_group_id } ))
      
      let all_facilities = await db.Facility.findAll({where: {id: facility_ids, status: 1}})
      let all_facility_groups = await db.FacilityGroup.findAll({where: {id: facility_group_ids}})
      let facility_projects_hash2 = {}

      for(var facility_project of facility_projects){

        let facility = _.find(all_facilities, function(f) {return (f.id == facility_project.facility_id)})
        let facility_group = _.find(all_facility_groups, function(f) {return (f.id == facility_project.facility_group_id)})

        let facility_hash = facility_project.toJSON()
        facility_hash['facility_project_id'] = facility_project.id
        facility_hash['class'] = "FacilityProject"
        let facility_status = await facility_project.getStatus({attributes: ['name']})
        facility_hash['project_status'] = facility_status.name//"Behind Schedule"
        facility_hash['facility_name'] = facility.facility_name
        facility_hash['facility'] = facility.toJSON()
        let fg_hash = facility_group.toJSON()
        facility_hash['facility']["facility_group_id"] = fg_hash['id']
        facility_hash['facility']["facility_group_name"] = fg_hash['name']
        facility_hash['facility']["facility_group_status"] = fg_hash['status']
        // facility_hash['facility']["status"] = facility_hash['facility']["status"]
        facility_hash['facility']["project_id"] = this.id

        // facility_project_ids.push(facility_project.id)
        facility_ids.push(facility_project.facility_id)

        // Adding Task Data
        // facility_hash.facility = await facility_project.getFacility()
        facility_hash.tasks = [] 

        var tasks = await db.Task.findAll({where: {facility_project_id: facility_project.id} })
        all_tasks = all_tasks.concat(tasks)
        var task_ids = _.uniq(tasks.map(function(e){return e.id}))
        var checklists = await db.Checklist.findAll({where: {listable_id: task_ids, listable_type: 'Task'}})
        var checklist_ids = _.uniq(checklists.map(function(e){return e.id}))
        var progress_lists = await db.ProgressList.findAll({where: {checklist_id: checklist_ids}})

        for(var task of tasks){
          let _task = await task.toJSON()
          facility_hash.tasks.push(_task)
        }

        // Adding issues data
        facility_hash.issues = [] 

        var issues = await db.Issue.findAll({where: {facility_project_id: facility_project.id} })
        all_issues = all_issues.concat(issues)
        var issue_ids = issues.map(function(e){return e.id})
        var checklists = await db.Checklist.findAll({where: {listable_id: issue_ids, listable_type: 'Issue'}})
        var checklist_ids = checklists.map(function(e){return e.id})
        var progress_lists = await db.ProgressList.findAll({where: {checklist_id: checklist_ids}})

        for(var issue of issues){
          let _issue = await  issue.toJSON()

          // _issue["responsible_users"] = []
          // _issue["responsible_users_last_name"] = []
          // _issue["responsible_users_first_name"] = []
          // _issue["accountable_users"] = []
          // _issue["accountable_users_last_name"] = []
          // _issue["accountable_users_first_name"] = []
          // _issue["consulted_users"] = []
          // _issue["informed_users"] = []
          // _issue["responsible_user_ids"] = []
          // _issue["accountable_user_ids"] = []
          // _issue["consulted_user_ids"] = []
          // _issue["informed_user_ids"] = []
          // _issue["notes"] = []
          // _issue["notes_updated_at"] = null
          // _issue["last_update"] = null
          // _issue["facility_id"] = facility.id
          // _issue["facility_name"] = facility.facility_name
          // _issue["contract_nickname"] = ""
          // _issue["vehicle_nickname"] = ""
          // _issue["project_id"] = this.id
          // _issue["sub_tasks"] = []
          // _issue["sub_issues"] = []
          // _issue["sub_task_ids"] = []
          // _issue["sub_issue_ids"] = []
          // _issue["sub_risk_ids"] = []
          // _issue["users"] = []
          // _issue["user_ids"] = []
          // _issue["user_names"] = []
          // _issue["due_date_duplicate"] = []
          // _issue["progress_status"] = []
          // _issue["attach_files"] = []
          // _issue["notes"] = []
          // _issue["class_name"] = "Issue"

          // let _tchecklists = []
          // for(var i = 0; i < checklists.length; i++ ){

          //   if(checklists[i].listable_id == _issue.id){

          //     let c = checklists[i].toJSON()
          //     c.progress_lists = []
          //     c.user = {id: c.user_id, full_name: ""}
          //     for(var k = 0; k < progress_lists.length; k++ ){
          //       if(progress_lists[k].checklist_id == c.id){
          //         let p = progress_lists[k].toJSON()
          //         p.user = {id: p.user_id, full_name: ""}
          //         c.progress_lists.push(p)
          //       }
          //     }
          //     _tchecklists.push(c)
          //     // console.log("################# _tchecklists", _tchecklists)

          //   }
          // }   

          // _issue.checklists = _tchecklists
          // _task.checklists = await task.getListable({include: [db.ProgressList, db.User]})
          facility_hash.issues.push(_issue)
        }


        // Adding risk data
        facility_hash.risks = [] 

        var risks = await db.Risk.findAll({where: {facility_project_id: facility_project.id} })
        all_risks = all_risks.concat(risks)
        var risk_ids = risks.map(function(e){return e.id})
        var checklists = await db.Checklist.findAll({where: {listable_id: risk_ids, listable_type: 'Risk'}})
        var checklist_ids = checklists.map(function(e){return e.id})
        var progress_lists = await db.ProgressList.findAll({where: {checklist_id: checklist_ids}})

        for(var risk of risks){
          let _risk = await risk.toJSON()

          // _risk["task_type"] =  {}
          // _risk["responsible_users"] = []
          // _risk["responsible_users_last_name"] = []
          // _risk["responsible_users_first_name"] = []
          // _risk["accountable_users"] = []
          // _risk["accountable_users_last_name"] = []
          // _risk["accountable_users_first_name"] = []
          // _risk["consulted_users"] = []
          // _risk["informed_users"] = []
          // _risk["responsible_user_ids"] = []
          // _risk["accountable_user_ids"] = []
          // _risk["consulted_user_ids"] = []
          // _risk["informed_user_ids"] = []
          // _risk["notes"] = []
          // _risk["notes_updated_at"] = null
          // _risk["last_update"] = null
          // _risk["facility_id"] = facility.id
          // _risk["facility_name"] = facility.facility_name
          // _risk["contract_nickname"] = ""
          // _risk["vehicle_nickname"] = ""
          // _risk["project_id"] = this.id
          // _risk["sub_tasks"] = []
          // _risk["sub_issues"] = []
          // _risk["sub_task_ids"] = []
          // _risk["sub_issue_ids"] = []
          // _risk["sub_risk_ids"] = []
          // _risk["users"] = []
          // _risk["user_ids"] = []
          // _risk["user_names"] = []
          // _risk["due_date_duplicate"] = []
          // _risk["progress_status"] = []
          // _risk["attach_files"] = []
          // _risk["notes"] = []
          // _risk["class_name"] = "Risk"

          // let _tchecklists = []
          // for(var i = 0; i < checklists.length; i++ ){

          //   if(checklists[i].listable_id == _risk.id){

          //     let c = checklists[i].toJSON()
          //     c.progress_lists = []
          //     c.user = {id: c.user_id, full_name: ""}
          //     for(var k = 0; k < progress_lists.length; k++ ){
          //       if(progress_lists[k].checklist_id == c.id){
          //         let p = progress_lists[k].toJSON()
          //         p.user = {id: p.user_id, full_name: ""}
          //         c.progress_lists.push(p)
          //       }
          //     }
          //     _tchecklists.push(c)
          //     // console.log("################# _tchecklists", _tchecklists)

          //   }
          // }   

          // _risk.checklists = _tchecklists
          // _task.checklists = await task.getListable({include: [db.ProgressList, db.User]})
          facility_hash.risks.push(_risk)
        }
        
        // facility_hash.risks = await db.Risk.findAll({where: {facility_project_id: facility_project_ids} })

        response.facilities.push(facility_hash)
        facility_projects_hash2[facility_project.id] = facility_hash
      }

      let all_user_ids = []
      let all_task_user_ids = _.uniq(_.map(all_tasks, function(t){ return t.id }))
      let all_task_users = await db.TaskUser.findAll({where: {task_id: all_task_user_ids}})
      all_user_ids = _.uniq(all_user_ids.concat( _.map(all_task_users, function(tu){return tu.user_id } ) ))

      let all_issue_user_ids = _.uniq(_.map(all_issues, function(t){ return t.id }))
      let all_issue_users = await db.IssueUser.findAll({where: {issue_id: all_issue_user_ids}})
      all_user_ids = all_user_ids.concat( _.map(all_issue_users, function(iu){return iu.user_id } ) )

      let all_risk_user_ids = _.uniq(_.map(all_risks, function(t){ return t.id }))
      let all_risk_users = await db.RiskUser.findAll({where: {risk_id: all_risk_user_ids}})
      all_user_ids = _.uniq(all_user_ids.concat( _.map(all_risk_users, function(ru){return ru.user_id } ) ))

      response.users = await  db.User.findAll({
        where: {id: all_user_ids},
        attributes: ['id','email', 'first_name', 'last_name', 'title', 'phone_number', 'status', 'full_name']
      })
      response.project_users = await  this.getProjectUsers()

      // Contracts
      let project_contracts = await db.ProjectContract.findAll({where: {project_id: this.id, id: authorized_project_contract_ids}})//await this.getProjectContracts()
      let project_contract_ids = _.uniq(_.map(project_contracts, function(pc){ return pc.id} ))
      let contract_project_datum_ids = _.uniq(_.map(project_contracts, function(pc){ return pc.contract_project_datum_id} ))
      let all_contract_project_data = await db.ContractProjectDatum.findAll({where: {id: contract_project_datum_ids} })
      response.contracts = []

      for(var project_contract of project_contracts){
        let c = _.find(all_contract_project_data, function(cpd) {return (cpd.id == project_contract.contract_project_datum_id )})
        let c_hash = c.toJSON()
        c_hash['tasks'] = []
        c_hash['issues'] = []
        c_hash['risks'] = []
        response.contracts.push(c_hash)
      }

      // Contract Vehicles
      let all_project_contract_vehicles = await db.ProjectContractVehicle.findAll({where: {project_id: this.id, id: authorized_project_contract_vehicle_ids}}) //await this.getProjectContractVehicles()
      let contract_vehicle_ids = _.uniq(_.map(all_project_contract_vehicles, function(pc){ return pc.contract_vehicle_id} ) )
      let all_contract_vehicles = await db.ContractVehicle.findAll({where: {id: contract_vehicle_ids} })
      response.contract_vehicles = []
      for(var project_contract_vehicle of all_project_contract_vehicles){
        var c = _.find(all_contract_vehicles, function(cpd) {return (cpd.id == project_contract_vehicle.contract_vehicle_id )})
        let c_hash = c.toJSON()
        c_hash['tasks'] = []
        c_hash['issues'] = []
        c_hash['risks'] = []
        response.contract_vehicles.push(c_hash)
      }

      // Facility Groups
      response.facility_groups = [] //_.uniqWith(facility_groups, function(x,y){ return x.id == y.id} );

      let all_facility_group_ids =_.uniq( _.map( ( facility_projects.concat(project_contracts)), function(fp){ return fp.facility_group_id} ))
      let project_facility_groups = await this.getProjectFacilityGroups()
      
      all_facility_group_ids = _.uniq(all_facility_group_ids.concat( _.map( project_facility_groups, function(fp){ return fp.facility_group_id} )))
      let facility_groups = await db.FacilityGroup.findAll({ where:{id: all_facility_group_ids} })

      for(var facility_group of facility_groups){

        let fg_facility_projects = _.filter(facility_projects, function(e){ return e.facility_group_id == facility_group.id })
        let facility_group_hash = facility_group.toJSON()
        facility_group_hash['contracts'] = []
        facility_group_hash['facilities'] = []
        for(var fg_fp of fg_facility_projects){
          if(facility_projects_hash2[fg_fp.id]){
            facility_group_hash['facilities'].push(facility_projects_hash2[fg_fp.id])
          }
        }
      
        facility_group_hash['project_ids'] = [this.id]//_.uniq(_.map(fg_facility_projects, function(e){return e.project_id}))
        facility_group_hash['contract_project_ids'] = []
        facility_group_hash['contract_vehicles'] = []
        facility_group_hash['contract_vehicle_ids'] = []
        
        response.facility_groups.push(facility_group_hash)
      }

      // statues
      let all_statues = await this.getProjectStatuses()
      let all_status_ids = _.uniq(_.map( all_statues, function(fp){ return fp.status_id} ))
      response.statuses = await db.Status.findAll({where: {id: all_status_ids}})
      response.task_types = await db.TaskType.findAll() // await this.getTaskTypes()
      response.issue_types = await db.IssueType.findAll() //await this.getIssueTypes()
      response.issue_severities = await db.IssueSeverity.findAll() //await this.getIssueSeverities()
      response.task_stages= await db.TaskStage.findAll() //await this.getTaskStages()
      response.issue_stages = await db.IssueStage.findAll() //await this.getIssueStages()
      response.risk_stages = await db.RiskStage.findAll() //await this.getRiskStages()
      response.lesson_stages = await db.LessonStage.findAll() //await this.getLessonStages()

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