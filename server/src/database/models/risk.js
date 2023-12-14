'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Risk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.hasMany(models.RiskUser);
      this.belongsTo(models.RiskStage);
      this.belongsToMany(models.User,{through: models.RiskUser, foreignKey: '', otherKey: '' });
      this.belongsTo(models.TaskType);
      // this.hasMany(models.RiskFile);
      this.hasMany(models.Note)
      
      this.belongsTo(models.FacilityProject);
      this.belongsTo(models.Contract);
      this.belongsTo(models.ProjectContract);
      this.belongsTo(models.ProjectContractVehicle);
      this.hasMany(models.Checklist);
      this.hasMany(models.RelatedTask);
      this.hasMany(models.RelatedIssue);
      this.hasMany(models.RelatedRisk);
      // this.belongsToMany(models.SubTask,{through: models.RelatedTask, foreignKey: '', otherKey: '' });
      // this.belongsToMany(models.SubIssue,{through: models.RelatedIssue, foreignKey: '', otherKey: '' });
      // this.belongsToMany(models.SubRisk,{through: models.RelatedRisk, foreignKey: '', otherKey: '' })

    }
  }
  Risk.init({
    risk_description: DataTypes.TEXT,
    impact_description: DataTypes.TEXT,
    start_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
    auto_calculate: DataTypes.BOOLEAN,
    progress: DataTypes.INTEGER,
    probability: DataTypes.INTEGER,
    impact_level: DataTypes.INTEGER,
    priority_level: DataTypes.INTEGER,
    risk_approach: DataTypes.INTEGER,
    risk_approach_description: DataTypes.TEXT,
    watched: DataTypes.BOOLEAN,
    watched_at: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    facility_project_id: DataTypes.INTEGER,
    task_type_id: DataTypes.INTEGER,
    text: DataTypes.STRING,
    kanban_order: DataTypes.INTEGER,
    risk_stage_id: DataTypes.INTEGER,
    probability_name: DataTypes.STRING,
    impact_level_name: DataTypes.STRING,
    probability_description: DataTypes.TEXT,
    approval_time: DataTypes.STRING,
    approved: DataTypes.BOOLEAN,
    important: DataTypes.BOOLEAN,
    ongoing: DataTypes.BOOLEAN,
    draft: DataTypes.BOOLEAN,
    on_hold: DataTypes.BOOLEAN,
    explanation: DataTypes.TEXT,
    duration: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    duration_name: DataTypes.STRING,
    status_name: DataTypes.STRING,
    reportable: DataTypes.BOOLEAN,
    closed_date: DataTypes.DATE,
    contract_id: DataTypes.INTEGER,
    project_contract_id: DataTypes.INTEGER,
    project_contract_vehicle_id: DataTypes.INTEGER,
    owner_id: DataTypes.INTEGER,
    owner_type: DataTypes.STRING
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'risks',
    modelName: 'Risk',
    underscored: true
  });
  return Risk;
};