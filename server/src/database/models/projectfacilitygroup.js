'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectFacilityGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProjectFacilityGroup.init({
    project_id: DataTypes.INTEGER,
    facility_group_id: DataTypes.INTEGER,
    is_default: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName: 'project_facility_groups',
    modelName: 'ProjectFacilityGroup',
  });
  return ProjectFacilityGroup;
};