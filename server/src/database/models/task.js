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
      // define association here
      this.belongsTo(models.TaskType,{ foreignKey: '' });
      this.belongsTo(models.TaskStage,{ foreignKey: '' });
      this.hasMany(models.TaskUser,{ foreignKey: '' });
      this.belongsToMany(models.User,{through: models.TaskUser, foreignKey: '', otherKey: '' });
      // this.hasMany(models.TaskFile,{ foreignKey: '' });
      this.hasMany(models.Note,{ foreignKey: '' });
      this.hasMany(models.Effort,{ foreignKey: '' })

      this.belongsTo(models.FacilityProject,{ foreignKey: '' });
      this.belongsTo(models.Contract,{ foreignKey: '' });
      this.belongsTo(models.ProjectContract,{ foreignKey: '' });
      this.belongsTo(models.ProjectContractVehicle,{ foreignKey: '' });
      this.hasMany(models.Checklist,{ foreignKey: '' });
      this.hasMany(models.RelatedTask,{ foreignKey: '' });
      this.hasMany(models.RelatedIssue,{ foreignKey: '' });
      this.hasMany(models.RelatedRisk,{ foreignKey: '' });
      // this.belongsToMany(models.SubTask,{through: models.RelatedTask, foreignKey: '', otherKey: '' });
      // this.belongsToMany(models.SubIssue,{through: models.RelatedIssue, foreignKey: '', otherKey: '' });
      // this.belongsToMany(models.SubRisk,{through: models.RelatedRisk, foreignKey: '', otherKey: '' })
      

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
  });
  return Task;
};