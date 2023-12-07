'use strict';
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
      // define association here
      this.belongsTo(models.IssueType,{ foreignKey: '' });
      this.belongsTo(models.IssueStage,{ foreignKey: '' });
      this.belongsTo(models.TaskType,{ foreignKey: '' });
      this.belongsTo(models.IssueSeverity,{ foreignKey: '' });
      this.hasMany(models.IssueUser,{ foreignKey: '' });
      this.belongsToMany(models.User,{through: models.IssueUser, foreignKey: '', otherKey: '' });
      // this.hasMany(models.IssueFile,{ foreignKey: '' });
      this.hasMany(models.Note,{ foreignKey: '' });

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
  });
  return Issue;
};