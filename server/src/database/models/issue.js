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
    tableName: 'issues',
    modelName: 'Issue',
  });
  return Issue;
};