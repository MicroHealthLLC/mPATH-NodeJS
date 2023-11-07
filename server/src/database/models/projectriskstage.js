'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectRiskStage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProjectRiskStage.init({
    project_id: DataTypes.INTEGER,
    risk_stage_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProjectRiskStage',
  });
  return ProjectRiskStage;
};