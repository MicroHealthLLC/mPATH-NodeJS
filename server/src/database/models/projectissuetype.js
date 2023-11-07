'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectIssueType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProjectIssueType.init({
    issue_type_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProjectIssueType',
  });
  return ProjectIssueType;
};