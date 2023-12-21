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
      // // define association here
      // this.belongsTo(models.Project);
      // // this.belongsTo(models.ProjectGroup)

    }
  }
  ProjectFacilityGroup.init({
    project_id: DataTypes.INTEGER,
    facility_group_id: DataTypes.INTEGER,
    is_default: DataTypes.BOOLEAN
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'project_facility_groups',
    modelName: 'ProjectFacilityGroup',
    underscored: true
  });
  return ProjectFacilityGroup;
};