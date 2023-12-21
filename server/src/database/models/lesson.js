'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // define association here
      // this.belongsTo(models.User);
      // this.belongsTo(models.TaskType);
      // this.belongsTo(models.LessonStage);
      // this.hasMany(models.LessonUser);
      // this.belongsToMany(models.User,{through: models.LessonUser, foreignKey: '', otherKey: '' });
      // // this.belongsTo(models.FacilityProject,{ foreignKey: '' , as: 'LessonFacilityProject' });
      // this.belongsTo(models.FacilityProject);
      // this.belongsTo(models.ProjectContract);
      // this.belongsTo(models.ProjectContractVehicle);
      // this.hasMany(models.Note);
      // // this.hasMany(models.LessonFile);
      // this.hasMany(models.LessonDetail);
      // this.hasMany(models.RelatedTask);
      // this.hasMany(models.RelatedIssue);
      // this.hasMany(models.RelatedRisk);
      // // this.belongsToMany(models.SubTask,{through: models.RelatedTask, foreignKey: '', otherKey: '' });
      // // this.belongsToMany(models.SubIssue,{through: models.RelatedIssue, foreignKey: '', otherKey: '' });
      // // this.belongsToMany(models.SubRisk,{through: models.RelatedRisk, foreignKey: '', otherKey: '' })

    }
  }
  Lesson.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    date: DataTypes.DATE,
    stage: DataTypes.STRING,
    task_type_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    lesson_stage_id: DataTypes.INTEGER,
    important: DataTypes.BOOLEAN,
    facility_project_id: DataTypes.INTEGER,
    reportable: DataTypes.BOOLEAN,
    draft: DataTypes.BOOLEAN,
    contract_id: DataTypes.INTEGER,
    project_contract_id: DataTypes.INTEGER,
    project_contract_vehicle_id: DataTypes.INTEGER,
    owner_id: DataTypes.INTEGER,
    owner_type: DataTypes.STRING
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'lessons',
    modelName: 'Lesson',
    underscored: true
  });
  return Lesson;
};