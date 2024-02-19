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
      this.hasMany(models.LessonUser,{onDelete: 'CASCADE', hooks: true });
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
      // this.hasMany(models.RelatedLesson);
      // // this.belongsToMany(models.SubTask,{through: models.RelatedTask, foreignKey: '', otherKey: '' });
      // // this.belongsToMany(models.SubIssue,{through: models.RelatedIssue, foreignKey: '', otherKey: '' });
      // // this.belongsToMany(models.SubLesson,{through: models.RelatedLesson, foreignKey: '', otherKey: '' })

    }

    async createOrUpdateLesson(params, options) {
      try {
        const { db } = require("./index.js");
        let user = options.user
        let project_id = options.project_id
        let facility_id = options.facility_id
        const lessonParams = params.lesson;
        const lesson = this;
        const iParams = { ...lessonParams };
        const user_ids = iParams.user_ids;
        // const subTaskIds = iParams.subTaskIds;
        // const subLessonIds = iParams.subLessonIds;
        // const subLessonIds = iParams.subLessonIds;
        // const notesAttributes = iParams.notesAttributes;
      
        let facility_project = await db.FacilityProject.findOne({where: {project_id: project_id, facility_id: facility_id}, raw: true})
        iParams['facility_project_id'] = facility_project.id
        console.log("**********iParams", iParams)

        lesson.setAttributes(iParams);
        
        if (iParams.project_contract_id) {
          lesson.project_contract_id = params.project_contract_id;
        } else if (iParams.project_contract_vehicle_id) {
          lesson.project_contract_vehicle_id = params.project_contract_vehicle_id;
        }
      
        await lesson.save();

        await lesson.manageNotes(iParams)
        await lesson.addLessonDetail(iParams,user)
        // if (subTaskIds && subTaskIds.length > 0) {
        //   const relatedTaskObjs = subTaskIds.map((sid) => ({
        //     relatableId: lesson.id,
        //     relatableType: 'Lesson',
        //     lessonId: sid,
        //   }));
        //   const relatedTaskObjs2 = subTaskIds.map((sid) => ({
        //     relatableId: sid,
        //     relatableType: 'Lesson',
        //     lessonId: lesson.id,
        //   }));
        //   await RelatedTask.bulkCreate(relatedTaskObjs, { transaction: t });
        //   await RelatedTask.bulkCreate(relatedTaskObjs2, { transaction: t });
        // }
  
        // if (subLessonIds && subLessonIds.length > 0) {
        //   const relatedLessonObjs = subLessonIds.map((sid) => ({
        //     relatableId: lesson.id,
        //     relatableType: 'Lesson',
        //     lessonId: sid,
        //   }));
        //   const relatedTaskObjs2 = subLessonIds.map((sid) => ({
        //     relatableId: sid,
        //     relatableType: 'Lesson',
        //     lessonId: lesson.id,
        //   }));
        //   await RelatedLesson.bulkCreate(relatedLessonObjs, { transaction: t });
        //   await RelatedTask.bulkCreate(relatedTaskObjs2, { transaction: t });
        // }
  
        // if (subLessonIds && subLessonIds.length > 0) {
        //   const relatedLessonObjs = subLessonIds.map((sid) => ({
        //     relatableId: lesson.id,
        //     relatableType: 'Lesson',
        //     lessonId: sid,
        //   }));
        //   const relatedTaskObjs2 = subLessonIds.map((sid) => ({
        //     relatableId: sid,
        //     relatableType: 'Lesson',
        //     lessonId: lesson.id,
        //   }));
        //   await RelatedLesson.bulkCreate(relatedLessonObjs, { transaction: t });
        //   await RelatedTask.bulkCreate(relatedTaskObjs2, { transaction: t });
        // }
  
        // if (checklistsAttributes && Object.keys(checklistsAttributes).length > 0) {
        //   const checklistObjs = Object.values(checklistsAttributes).map((value) => {
        //     if (value.id) {
        //       const c = allChecklists.find((cc) => cc.id === parseInt(value.id));
        //       if (value._destroy && value._destroy === 'true') {
        //         return c.destroy({ transaction: t });
        //       } else {
        //         c.setAttributes(value);
        //         return c.save({ transaction: t });
        //       }
        //     } else {
        //       delete value._destroy;
        //       const c = Checklist.build({
        //         ...value,
        //         listableId: lesson.id,
        //         listableType: 'Lesson',
        //       });
        //       c.progressLists.forEach((p) => {
        //         p.userId = user.id;
        //       });
        //       return c.save({ transaction: t });
        //     }
        //   });
        //   // NOTE: as currently we don't have a solution for nested attributes
        //   // await Checklist.bulkCreate(checklistObjs, { transaction: t });
        // }
    
        
        // NOTE: This is not working inside the Transaction block.
        // Reproduce: Create a new lesson with a file and link both, and it is giving an error
        // lesson.addLinkAttachment(params);
    
        // await lesson.updateClosed();
    
        // await lesson.reload();
        return lesson;
      } catch (error) {
        // Handle the error
        console.error("Error in execution", error);
      }
    }


    async manageNotes(params){
      const { db } = require("./index.js");
      if(params.notes_attributes){
        var create_notes = []
        var delete_note_ids = []
        for(var note of params.notes_attributes){
          note['noteable_id'] = this.id
          note['noteable_type'] = "Lesson"
          if(note['_destroy'] && note['_destroy'] == 'true' && note.id ){
            delete_note_ids.push(note.id)
          }else{
            create_notes.push(note)
          }            
        }
        if(create_notes.length > 0){
          await db.Note.bulkCreate(create_notes, {updateOnDuplicate: ['id']})
        }
        if(delete_note_ids.length > 0){
          await db.Note.destroy({ where: { id: delete_note_ids }})
        }
        console.log("*****delete_note_ids", delete_note_ids)
      }
    }

    async addLessonDetail(params,user){
      const { db } = require("./index.js");
      var create_lesson_details = []
      var delete_lesson_detail_ids = []
      var successes = params['successes']
      var failures = params['failures']
      var best_practices = params['best_practices']
      
      if(successes){
        for(var success of successes){
          success['detail_type'] = "success"
          success['lesson_id'] = this.id
          if(success['id'] && success['_destroy'] == 'true'){
            delete_lesson_detail_ids.push(success['id'])
          }else{
            if(success['id'] == ''){
              delete(success['id'])
            }
            if(!success['user_id'] || success['user_id'] == '' || success['user_id'] == 'null'){
              success['user_id'] = user.id
            } 
            create_lesson_details.push(success)
          }          
        }
      }
      if(failures){
        for(var failure of failures){
          failure['detail_type'] = "failure"
          failure['lesson_id'] = this.id
          if(failure['id'] && failure['_destroy'] == 'true'){
            delete_lesson_detail_ids.push(failure['id'])
          }else{
            if(failure['id'] == ''){
              delete(failure['id'])
            }
            if(!failure['user_id'] ||  failure['user_id'] == '' || failure['user_id'] == 'null'){
              failure['user_id'] = user.id
            } 
            create_lesson_details.push(failure)
          } 
        }
      }
      if(best_practices){
        for(var best_practice of best_practices){
          best_practice['detail_type'] = "best_practice"
          best_practice['lesson_id'] = this.id
          if(best_practice['id'] && best_practice['_destroy'] == 'true'){
            delete_lesson_detail_ids.push(best_practice['id'])
          }else{
            if(best_practice['id'] == ''){
              delete(best_practice['id'])
            }
            if(!best_practice['user_id'] || best_practice['user_id'] == '' || best_practice['user_id'] == 'null'){
              best_practice['user_id'] = user.id
            }           
            create_lesson_details.push(best_practice)
          } 
        }
      }
      console.log("lesson details", create_lesson_details)
      if(create_lesson_details.length> 0){
        await db.LessonDetail.bulkCreate(create_lesson_details, {updateOnDuplicate: ['id']})
      }
      if(delete_lesson_detail_ids.length > 0){
        await db.LessonDetail.destroy({ where: { id: delete_lesson_detail_ids }})
      }
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
      
      // for(var checklist of checklists){
      //   checklist.user = {id: checklist.user_id, full_name: ""}
      //   checklist.progress_lists = progress_lists.filter(function(p){ p.checklist_id == checklist.id })
      //   _resource.checklists.push(checklist)
      // }

      let facility_project = await this.getFacilityProject()
      let facility = await db.Facility.findOne({where: {id: facility_project.facility_id}})
      let lesson_users = await this.getLessonUsers()
      let notes = await db.Note.findAll({where: {noteable_type: 'Lesson', noteable_id: this.id},order: [['created_at', 'DESC']], raw: true})

      let successes = await db.LessonDetail.findAll({where: {lesson_id: this.id, detail_type: 'success'}, raw: true})
      let failures = await db.LessonDetail.findAll({where: {lesson_id: this.id, detail_type: 'failure'}, raw: true})
      let best_practices = await db.LessonDetail.findAll({where: {lesson_id: this.id, detail_type: 'best_practice'}, raw: true})

      let all_user_ids = _.compact(_.uniq(_.map(lesson_users, function(n){return n.user_id})))
      let successes_user_ids = _.compact(_.uniq(_.map(successes, function(n){return n.user_id})))
      let failures_user_ids = _.compact(_.uniq(_.map(failures, function(n){return n.user_id})))
      let best_practices_user_ids = _.compact(_.uniq(_.map(best_practices, function(n){return n.user_id})))
      
      var note_user_ids = _.compact(_.uniq(_.map(notes, function(n){return n.user_id})))
      all_user_ids = _.compact(_.uniq(_.concat(all_user_ids,note_user_ids,successes_user_ids, failures_user_ids,best_practices_user_ids)))
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

      _resource["successes"] = []
      console.log("***successes", successes)

      for(var success of successes){
        let user = _.find(users, function(u){ return u.id == success.user_id})
        if(user)
          success['user'] = {id: user.id, full_name: user.full_name}
        else
          success['user'] = {}
        _resource["successes"].push(success)
      }
      
      _resource["failures"] = []
      for(var failure of failures){
        let user = _.find(users, function(u){ return u.id == failure.user_id})
        if(user)
          failure['user'] = {id: user.id, full_name: user.full_name}
        else
          failure['user'] = {}
        _resource["failures"].push(failure)
      }
      
      _resource["best_practices"] = []
      for(var best_practice of best_practices){
        let user = _.find(users, function(u){ return u.id == best_practice.user_id})
        if(user)
          best_practice['user'] = {id: user.id, full_name: user.full_name}
        else
          best_practice['user'] = {}
        _resource["best_practices"].push(best_practice)
      }

      _resource["attach_files"] = []
      _resource["sub_tasks"] = await db.RelatedTask.findAll({where: {relatable_type: 'Lesson', relatable_id: _resource.id}, raw: true })
      _resource["sub_issues"] = await db.RelatedIssue.findAll({where: {relatable_type: 'Lesson', relatable_id: _resource.id}, raw: true })
      _resource["sub_risks"] = await db.RelatedRisk.findAll({where: {relatable_type: 'Lesson', relatable_id: _resource.id}, raw: true })
      _resource["sub_task_ids"] =  _.map(_resource["sub_tasks"], function(u){ return u.id} )
      _resource["sub_issue_ids"] = _.map(_resource["sub_issues"], function(u){ return u.id} )
      _resource["sub_risks"] = _.map(_resource["sub_risks"], function(u){ return u.id} )

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