'use strict';
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
      // this.hasMany(models.TaskUser);
      // this.belongsToMany(models.User,{through: models.TaskUser, foreignKey: '', otherKey: '' });
      // // this.hasMany(models.TaskFile);
      // this.hasMany(models.Note);
      // this.hasMany(models.Effort)

      // this.belongsTo(models.FacilityProject);
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
    // async toJSON(){

    //   const { db } = require("./index.js");
    //   let response = this.get({ plain: true });
    //   //Replace this code with eager loading
    //   // response.checklists = await this.getListable({include: [db.ProgressList]})
    //   response.checklists = []
    //   let checklists = await db.Checklist.findAll({where: {listable_id: response.id, listable_type: 'Task'}})
    //   for(var checklist of checklists){
    //     let progress_lists = await checklist.getProgressLists()
    //     checklist.progress_lists = progress_lists
    //     response.checklists.push(checklist)
    //   }
    //   return response
    // }
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