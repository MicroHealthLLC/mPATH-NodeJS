'use strict';
const {_} = require("lodash") 

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // define association here
      this.belongsTo(models.User);
      this.belongsTo(models.TaskType);
      this.belongsTo(models.LessonStage);
      this.hasMany(models.LessonUser);
      // this.belongsToMany(models.User,{through: models.LessonUser, foreignKey: '', otherKey: '' });
      // // this.belongsTo(models.FacilityProject,{ foreignKey: '' , as: 'LessonFacilityProject' });
      this.belongsTo(models.FacilityProject);
      // this.belongsTo(models.ProjectContract);
      // this.belongsTo(models.ProjectContractVehicle);
      // this.hasMany(models.Note);
      // // this.hasMany(models.LessonFile);
      // this.hasMany(models.LessonDetail);
      // this.hasMany(models.RelatedTask);
      // this.hasMany(models.RelatedIssue);
      // this.hasMany(models.RelatedRisk);
      // // this.belongsToMany(models.SubTask,{through: models.RelatedTask, foreignKey: '', otherKey: '' });
      // // this.belongsToMany(models.SubIssue,{through: models.RelatedIssue, foreignKey: '', otherKey: '' });
      // // this.belongsToMany(models.SubRisk,{through: models.RelatedRisk, foreignKey: '', otherKey: '' })

    }

    async toJSON(){
      const { db } = require("./index.js");
      
      let _resource = this.get({ plain: true });
      //Replace this code with eager loading
      // response.checklists = await this.getListable({include: [db.ProgressList]})

      // // Add checklists
      // _resource.checklists = []
      // let checklists = await db.Checklist.findAll({where: {listable_id: _resource.id, listable_type: 'Issue'}, raw: true })
      // var checklist_ids = _.uniq(checklists.map(function(e){return e.id}))
      // var progress_lists = await db.ProgressList.findAll({where: {checklist_id: checklist_ids}, raw: true})

      // console.log("***progress lists", progress_lists)
      // console.log("***checklists lists", checklists)

      // for(var checklist of checklists){
      //   checklist.user = {id: checklist.user_id, full_name: ""}
      //   checklist.progress_lists = progress_lists.filter(function(p){ p.checklist_id == checklist.id })
      //   _resource.checklists.push(checklist)
      // }

      let facility_project = await this.getFacilityProject()
      let facility = await db.Facility.findOne({where: {id: facility_project.facility_id}})
      let lesson_users = await this.getLessonUsers()
      let notes = await db.Note.findAll({where: {noteable_type: 'Lesson', noteable_id: this.id},order: [['created_at', 'DESC']], raw: true})
      let all_user_ids = _.compact(_.uniq(_.map(lesson_users, function(n){return n.user_id})))
      var note_user_ids = _.compact(_.uniq(_.map(notes, function(n){return n.user_id})))
      all_user_ids = _.concat(all_user_ids,note_user_ids)
      let users = await db.User.findAll({where: {id: all_user_ids}})
      var program = await facility_project.getProject()
      _resource["program_name"] = program.name
      _resource["program_id"] = program.id
      _resource["project_id"] = facility.id
      _resource["project_name"] = facility.facility_name
      _resource["contract_nickname"] = ""
      _resource["vehicle_nickname"] = ""
      var facility_group = await facility_project.getFacilityGroup()
      _resource["project_group"] = facility_group.name
      var category = await this.getTaskType()
      _resource["category"] = category ? category.name : null
      var lesson_stage = await this.getLessonStage()
      _resource["lesson_stage"] = lesson_stage ? lesson_stage.name : null
      _resource["notes_updated_at"] =
      _resource["users"] = []
      _resource["user_ids"] = []
      _resource["user_names"] = []
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
        _resource['users'].push(_uh)
        _resource["user_ids"].push(_uh.id)
        _resource['user_names'].push(_uh.full_name)
      }
      var user = await this.getUser()
      _resource["added_by"] = user.getFullName()
      _resource["created_by"] = {
        id: user.id,
        full_name: user.getFullName()
      }
      _resource["successes"] = [] //successes.map(&:to_json),
      _resource["failures"] = [] //failures.map(&:to_json),
      _resource["best_practices"] = [] ///best_practices.map(&:to_json)
      _resource["attach_files"] = []
      _resource["sub_tasks"] = await db.RelatedTask.findAll({where: {relatable_type: 'Lesson', relatable_id: _resource.id}, raw: true })
      _resource["sub_issues"] = await db.RelatedIssue.findAll({where: {relatable_type: 'Lesson', relatable_id: _resource.id}, raw: true })
      _resource["sub_risks"] = await db.RelatedRisk.findAll({where: {relatable_type: 'Lesson', relatable_id: _resource.id}, raw: true })
      _resource["sub_task_ids"] =  _.map(_resource["sub_tasks"], function(u){ return u.id} )
      _resource["sub_issue_ids"] = _.map(_resource["sub_issues"], function(u){ return u.id} )
      _resource["sub_risk_ids"] = _.map(_resource["sub_risks"], function(u){ return u.id} )

      _resource["task_type_id"] = parseInt(_resource['task_type_id'])
      _resource["notes"] = []
      
      for(var note of notes){
        let n = note
        let user = _.find(users, function(u){ return u.id == n.user_id})
        n['user'] = {id: user.id, full_name: user.full_name}

        _resource['notes'].push(n)
        
      }
      _resource['last_update'] = _resource['notes'][0] ? _resource['notes'][0] : {}

      _resource["class_name"] = "Lesson"

      return _resource
    }


  }
  Lesson.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    date: DataTypes.DATE,
    stage: DataTypes.STRING,
    task_type_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    lesson_stage_id: DataTypes.INTEGER,
    important: DataTypes.BOOLEAN,
    facility_project_id: DataTypes.INTEGER,
    reportable: DataTypes.BOOLEAN,
    draft: DataTypes.BOOLEAN,
    contract_id: DataTypes.INTEGER,
    project_contract_id: DataTypes.INTEGER,
    project_contract_vehicle_id: DataTypes.INTEGER,
    owner_id: DataTypes.INTEGER,
    owner_type: DataTypes.STRING
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'lessons',
    modelName: 'Lesson',
    underscored: true
  });
  return Lesson;
};