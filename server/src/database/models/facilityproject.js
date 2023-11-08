'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FacilityProject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FacilityProject.init({
    facility_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    due_date: DataTypes.DATE,
    status_id: DataTypes.INTEGER,
    progress: DataTypes.INTEGER,
    color: DataTypes.STRING,
    facility_group_id: DataTypes.INTEGER,
    project_facility_group_id: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'facility_projects',
    modelName: 'FacilityProject',
  });
  return FacilityProject;
};