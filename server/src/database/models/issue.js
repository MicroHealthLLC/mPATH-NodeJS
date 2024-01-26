'use strict';
const {_} = require("lodash") 

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Issue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // define association here
      // this.belongsTo(models.IssueType);
      // this.belongsTo(models.IssueStage);
      // this.belongsTo(models.TaskType);
      // this.belongsTo(models.IssueSeverity);
      this.hasMany(models.IssueUser);
      // this.belongsToMany(models.User,{through: models.IssueUser, foreignKey: '', otherKey: '' });
      // // this.hasMany(models.IssueFile);
      // this.hasMany(models.Note);

      this.belongsTo(models.FacilityProject);
      // // this.belongsToMany(models.Project, {through: models.FacilityProject});
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

    async createOrUpdateIssue(params, options) {
      try {
        const { db } = require("./index.js");
        let user = options.user
        let project_id = options.project_id
        let facility_id = options.facility_id
        const issueParams = params;
        const issue = this;
        const iParams = { ...issueParams };
        const user_ids = iParams.user_ids;
        // const subTaskIds = iParams.subTaskIds;
        // const subIssueIds = iParams.subIssueIds;
        // const subRiskIds = iParams.subRiskIds;
        const checklistsAttributes = iParams.checklistsAttributes;
        // const notesAttributes = iParams.notesAttributes;
      
        if (!iParams.planned_effort) {
          iParams.planned_effort = 0.0;
        }
        if (!iParams.actual_effort) {
          iParams.actual_effort = 0.0;
        }
        let facility_project = await db.FacilityProject.findOne({where: {project_id: project_id, facility_id: facility_id}, raw: true})
        iParams['facility_project_id'] = facility_project.id
        console.log("**********iParams", iParams)
        
        issue.setAttributes(iParams);
        
        console.log("***issue.planned_effort", issue.planned_effort)

        if (iParams.project_contract_id) {
          issue.project_contract_id = params.project_contract_id;
        } else if (iParams.project_contract_vehicle_id) {
          issue.project_contract_vehicle_id = params.project_contract_vehicle_id;
        }
      
        const allChecklists = await db.Checklist.findAll({where: {listable_id: issue.id, listable_type: 'Issue'}})

        await issue.save();

        await issue.assignUsers(iParams)
        await issue.manageNotes(iParams)
        await issue.manageChecklists(iParams)
        // if (subTaskIds && subTaskIds.length > 0) {
        //   const relatedTaskObjs = subTaskIds.map((sid) => ({
        //     relatableId: issue.id,
        //     relatableType: 'Issue',
        //     issueId: sid,
        //   }));
        //   const relatedTaskObjs2 = subTaskIds.map((sid) => ({
        //     relatableId: sid,
        //     relatableType: 'Issue',
        //     issueId: issue.id,
        //   }));
        //   await RelatedTask.bulkCreate(relatedTaskObjs, { transaction: t });
        //   await RelatedTask.bulkCreate(relatedTaskObjs2, { transaction: t });
        // }
  
        // if (subIssueIds && subIssueIds.length > 0) {
        //   const relatedIssueObjs = subIssueIds.map((sid) => ({
        //     relatableId: issue.id,
        //     relatableType: 'Issue',
        //     issueId: sid,
        //   }));
        //   const relatedTaskObjs2 = subIssueIds.map((sid) => ({
        //     relatableId: sid,
        //     relatableType: 'Issue',
        //     issueId: issue.id,
        //   }));
        //   await RelatedIssue.bulkCreate(relatedIssueObjs, { transaction: t });
        //   await RelatedTask.bulkCreate(relatedTaskObjs2, { transaction: t });
        // }
  
        // if (subRiskIds && subRiskIds.length > 0) {
        //   const relatedRiskObjs = subRiskIds.map((sid) => ({
        //     relatableId: issue.id,
        //     relatableType: 'Issue',
        //     riskId: sid,
        //   }));
        //   const relatedTaskObjs2 = subRiskIds.map((sid) => ({
        //     relatableId: sid,
        //     relatableType: 'Risk',
        //     issueId: issue.id,
        //   }));
        //   await RelatedRisk.bulkCreate(relatedRiskObjs, { transaction: t });
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
        //         listableId: issue.id,
        //         listableType: 'Issue',
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
        // Reproduce: Create a new issue with a file and link both, and it is giving an error
        // issue.addLinkAttachment(params);
    
        // await issue.updateClosed();
    
        // await issue.reload();
        return issue;
      } catch (error) {
        // Handle the error
        console.error("Error in execution", error);
      }
    }
    async manageChecklists(params){
      const { db } = require("./index.js");
      if(params.checklists_attributes){
        var create_checklist = []
        var delete_checklist_ids = []
        for(var checklist of params.checklists_attributes){
          
          if(checklist['_destroy'] && checklist['_destroy'] == 'true' && checklist.id ){
            delete_checklist_ids.push(checklist.id)
          }else{
            checklist['listable_id'] = this.id
            checklist['listable_type'] = "Issue"
            
            if(!checklist['user_id'] || checklist['user_id'] == 'null'){
              checklist['user_id'] = this.user_id
            }
            create_checklist.push(checklist)
          }
        }
        if(delete_checklist_ids.length > 0){
          await db.Checklist.destroy({ where: { id: delete_checklist_ids }})
        }

        if(create_checklist.length > 0){
          await db.Checklist.bulkCreate(create_checklist, {updateOnDuplicate: ['id']})
        }
      }
    }

    async manageNotes(params){
      const { db } = require("./index.js");
      if(params.notes_attributes){
        var create_notes = []
        var delete_note_ids = []
        for(var note of params.notes_attributes){
          note['noteable_id'] = this.id
          note['noteable_type'] = "Issue"
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

    async assignUsers(params){
      
      const { db } = require("./index.js");

      const accountableResourceUsers = [];
      const responsibleResourceUsers = [];
      const consultedResourceUsers = [];
      const informedResourceUsers = [];
      const p_accountable_user_ids = _.compact(params.accountable_user_ids)
      const p_responsible_user_ids = _.compact(params.responsible_user_ids)
      const p_consulted_user_ids = _.compact(params.consulted_user_ids)
      const p_informed_user_ids = _.compact(params.informed_user_ids)
  
      const resource = this;
      const resourceUsers = await resource.getIssueUsers();
      const accountableUserIds = resourceUsers
        .filter((ru) => ru.accountable())
        .map((ru) => ru.user_id);
      const responsibleUserIds = resourceUsers
        .filter((ru) => ru.responsible())
        .map((ru) => ru.user_id);
      const consultedUserIds = resourceUsers
        .filter((ru) => ru.consulted())
        .map((ru) => ru.user_id);
      const informedUserIds = resourceUsers
        .filter((ru) => ru.informed())
        .map((ru) => ru.user_id);
      
      const usersToDelete = [];
      
      if (p_accountable_user_ids && p_accountable_user_ids.length > 0) {
        p_accountable_user_ids.forEach((uid) => {
          if (uid !== "undefined" && !accountableUserIds.includes(parseInt(uid))) {
            accountableResourceUsers.push({
              user_id: parseInt(uid),
              task_id: resource.id,
              user_type: 'accountable',
            });
          }
        });
        usersToDelete.push(
          ...accountableUserIds.filter(
            (uid) => !p_accountable_user_ids.includes(uid.toString())
          )
        );
      }
      
      if (p_responsible_user_ids && p_responsible_user_ids.length > 0) {
        p_responsible_user_ids.forEach((uid) => {
          if (uid !== "undefined" && !responsibleUserIds.includes(parseInt(uid))) {
            responsibleResourceUsers.push({
              user_id: parseInt(uid),
              task_id: resource.id,
              user_type: 'responsible',
            });
          }
        });
        usersToDelete.push(
          ...responsibleUserIds.filter(
            (uid) => !p_responsible_user_ids.includes(uid.toString())
          )
        );
      }
      
      if (p_consulted_user_ids &&p_consulted_user_ids.length > 0) {
        p_consulted_user_ids.forEach((uid) => {
          if (uid !== "undefined" && !consultedUserIds.includes(parseInt(uid))) {
            consultedResourceUsers.push({
              user_id: parseInt(uid),
              task_id: resource.id,
              user_type: 'consulted',
            });
          }
        });
        usersToDelete.push(
          ...consultedUserIds.filter(
            (uid) => !p_consulted_user_ids.includes(uid.toString())
          )
        );
      }
      
      if (p_informed_user_ids && p_informed_user_ids.length > 0) {
        p_informed_user_ids.forEach((uid) => {
          if (uid !== "undefined" && !informedUserIds.includes(parseInt(uid))) {
            informedResourceUsers.push({
              user_id: parseInt(uid),
              task_id: resource.id,
              user_type: 'informed',
            });
          }
        });
        usersToDelete.push(
          ...informedUserIds.filter(
            (uid) => !p_informed_user_ids.includes(uid.toString())
          )
        );
      }
      
      const recordsToImport = [
        ...accountableResourceUsers,
        ...responsibleResourceUsers,
        ...consultedResourceUsers,
        ...informedResourceUsers,
      ];
      console.log("***recordsToImport", recordsToImport)
      console.log("***recordsToImport", usersToDelete)
      if (usersToDelete.length > 0) {
        resourceUsers
          .filter((ru) => usersToDelete.includes(ru.user_id))
          .forEach((ru) => ru.destroy());
      }
      
      if (recordsToImport.length > 0) {
        // TaskUser.import(recordsToImport);
  
        const issueUsers = await db.IssueUser.bulkCreate(recordsToImport);
  
      }
      
    }

  }
  Issue.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    issue_type_id: DataTypes.INTEGER,
    issue_severity_id: DataTypes.INTEGER,
    facility_project_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
    progress: DataTypes.INTEGER,
    auto_calculate: DataTypes.BOOLEAN,
    watched: DataTypes.BOOLEAN,
    watched_at: DataTypes.DATE,
    issue_stage_id: DataTypes.INTEGER,
    kanban_order: DataTypes.INTEGER,
    task_type_id: DataTypes.INTEGER,
    important: DataTypes.BOOLEAN,
    draft: DataTypes.BOOLEAN,
    on_hold: DataTypes.BOOLEAN,
    reportable: DataTypes.BOOLEAN,
    contract_id: DataTypes.INTEGER,
    project_contract_id: DataTypes.INTEGER,
    project_contract_vehicle_id: DataTypes.INTEGER,
    owner_id: DataTypes.INTEGER,
    owner_type: DataTypes.STRING
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'issues',
    modelName: 'Issue',
    underscored: true
  });
  return Issue;
};