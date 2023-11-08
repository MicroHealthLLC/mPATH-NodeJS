'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectLessonStage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProjectLessonStage.init({
    project_id: DataTypes.INTEGER,
    lesson_stage_id: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'project_lession_stages',
    modelName: 'ProjectLessonStage',
  });
  return ProjectLessonStage;
};