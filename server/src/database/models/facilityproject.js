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
      this.belongsTo(models.Facility,{ foreignKey: '' });
this.belongsTo(models.Project,{ foreignKey: '' });
this.belongsTo(models.Status,{ foreignKey: '' });
this.hasMany(models.Task,{ foreignKey: '' });
this.belongsToMany(models.TaskType,{through: models.Task, foreignKey: '', otherKey: '' });
this.hasMany(models.Issue,{ foreignKey: '' });
this.hasMany(models.Risk,{ foreignKey: '' });
this.hasMany(models.Lesson,{ foreignKey: '' });
this.hasMany(models.Note,{ foreignKey: '' });
this.hasMany(models.FacilityPrivilege,{ foreignKey: '' });
this.belongsTo(models.FacilityGroup,{ foreignKey: '' });
this.hasMany(models.Effort,{ foreignKey: '' })

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
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'facility_projects',
    modelName: 'FacilityProject',
  });
  return FacilityProject;
};