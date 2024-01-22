'use strict';
const {_} = require("lodash") 

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // define association here
      // this.belongsTo(models.TaskType);
      // this.belongsTo(models.TaskStage);
      this.hasMany(models.TaskUser);
      // this.belongsToMany(models.User,{through: models.TaskUser, foreignKey: '', otherKey: '' });
      // // this.hasMany(models.TaskFile);
      // this.hasMany(models.Note);
      // this.hasMany(models.Effort)

      this.belongsTo(models.FacilityProject);
      // this.belongsTo(models.Contract);
      // this.belongsTo(models.ProjectContract);
      // this.belongsTo(models.ProjectContractVehicle);
      this.hasMany(models.Checklist, {as: 'listable', foreignKey: 'listable_id'});
      // this.hasMany(models.RelatedTask);
      // this.hasMany(models.RelatedIssue);
      // this.hasMany(models.RelatedRisk);
      // // this.belongsToMany(models.SubTask,{through: models.RelatedTask, foreignKey: '', otherKey: '' });
      // // this.belongsToMany(models.SubIssue,{through: models.RelatedIssue, foreignKey: '', otherKey: '' });
      // // this.belongsToMany(models.SubRisk,{through: models.RelatedRisk, foreignKey: '', otherKey: '' })
      

    }
    async toJSON(){

      const { db } = require("./index.js");
      let _task = this.get({ plain: true });
      //Replace this code with eager loading
      // response.checklists = await this.getListable({include: [db.ProgressList]})

      // Add checklists
      // _task.checklists = []
      // let checklists = await db.Checklist.findAll({where: {listable_id: _task.id, listable_type: 'Task'}, raw: true })
      // var checklist_ids = _.uniq(checklists.map(function(e){return e.id}))
      // var progress_lists = await db.ProgressList.findAll({where: {checklist_id: checklist_ids}})

      // console.log("***progress lists", progress_lists)
      
      // for(var checklist of checklists){
      //   checklist.user = {id: checklist.user_id, full_name: ""}
      //   checklist.progress_lists = progress_lists.filter(function(p){ p.checklist_id == checklist.id })
      //   _task.checklists.push(checklist)
      // }

      let facility_project = await this.getFacilityProject()
      let facility = await db.Facility.findOne({where: {id: facility_project.facility_id}})
      let task_users = await this.getTaskUsers()
      let all_user_ids = _.uniq(task_users.map(function(e){return e.user_id}))
      let users = await db.User.findAll({where: {id: all_user_ids}})

      const accountableUserIds = task_users
        .filter((ru) => ru.accountable)
        .map((ru) => ru.user_id);
      const responsibleUserIds = task_users
        .filter((ru) => ru.responsible)
        .map((ru) => ru.user_id);
      const consultedUserIds = task_users
        .filter((ru) => ru.consulted)
        .map((ru) => ru.user_id);
      const informedUserIds = task_users
        .filter((ru) => ru.informed)
        .map((ru) => ru.user_id);      

      _task["users"] = []
      _task["user_ids"] = []
      _task["user_names"] = []
      for(var user of users){
        let _uh = {
          id: user.id,
          full_name: user.getFullName(),
          title: user.title,
          phone_number: user.phone_number,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        }
        _task['users'].push(_uh)
        _task["user_ids"].push(_uh.id)
        _task['user_names'].push(_uh.full_name)
      }

      _task["sub_tasks"] = await db.RelatedTask.findAll({where: {relatable_type: 'Task', relatable_id: _task.id}, raw: true })
      _task["sub_issues"] = await db.RelatedIssue.findAll({where: {relatable_type: 'Task', relatable_id: _task.id}, raw: true })
      _task["sub_risks"] = await db.RelatedRisk.findAll({where: {relatable_type: 'Task', relatable_id: _task.id}, raw: true })
      _task["sub_task_ids"] =  _.map(_task["sub_tasks"], function(u){ u.id} )
      _task["sub_issue_ids"] = _.map(_task["sub_issues"], function(u){ u.id} )
      _task["sub_risk_ids"] = _.map(_task["sub_risks"], function(u){ u.id} )
      _task["responsible_users"] =  _.filter(users, function(u){ return responsibleUserIds.includes(u.id)  })
      _task["responsible_users_last_name"] =  _.map(_task["responsible_users"], function(u){ return u.last_name} )
      _task["responsible_users_first_name"] = _.map(_task["responsible_users"], function(u){ return u.first_name} )
      _task["accountable_users"] =  _.filter(users, function(u){ return accountableUserIds.includes(u.id)  })
      _task["accountable_users_last_name"] =  _.map(_task["accountable_users"], function(u){ return u.last_name} )
      _task["accountable_users_first_name"] =  _.map(_task["accountable_users"], function(u){ return u.first_name} )
      _task["consulted_users"] =  _.filter(users, function(u){ return consultedUserIds.includes(u.id)  })
      _task["informed_users"] = _.filter(users, function(u){ return informedUserIds.includes(u.id)  })
      _task["responsible_user_ids"] = responsibleUserIds
      _task["accountable_user_ids"] = accountableUserIds
      _task["consulted_user_ids"] =  consultedUserIds
      _task["informed_user_ids"] =  informedUserIds
      _task["facility_id"] = facility.id
      _task["facility_name"] =  facility.facility_name
      _task["contract_nickname"] =  null
      _task["vehicle_nickname"] =  null
      _task["project_id"] = facility_project.project_id
      _task["progress_status"] = _task.progress >= 100 ? "completed" : "active"

      _task["due_date_duplicate"] = []
      _task["attach_files"] = []
      _task["notes"] = []
      _task["class_name"] = "Task"

      return _task
    }
  }
  Task.init({
    text: DataTypes.STRING,
    description: DataTypes.TEXT,
    due_date: DataTypes.DATE,
    progress: DataTypes.INTEGER,
    task_type_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    facility_project_id: DataTypes.INTEGER,
    auto_calculate: DataTypes.BOOLEAN,
    watched: DataTypes.BOOLEAN,
    watched_at: DataTypes.DATE,
    task_stage_id: DataTypes.INTEGER,
    kanban_order: DataTypes.INTEGER,
    important: DataTypes.BOOLEAN,
    ongoing: DataTypes.BOOLEAN,
    draft: DataTypes.BOOLEAN,
    on_hold: DataTypes.BOOLEAN,
    reportable: DataTypes.BOOLEAN,
    closed_date: DataTypes.DATE,
    contract_id: DataTypes.INTEGER,
    project_contract_id: DataTypes.INTEGER,
    project_contract_vehicle_id: DataTypes.INTEGER,
    owner_id: DataTypes.INTEGER,
    owner_type: DataTypes.STRING,
    planned_effort: DataTypes.DECIMAL,
    actual_effort: DataTypes.DECIMAL,
    auto_calculate_planned_effort: DataTypes.BOOLEAN
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'tasks',
    modelName: 'Task',
    underscored: true
  });
  return Task;
};