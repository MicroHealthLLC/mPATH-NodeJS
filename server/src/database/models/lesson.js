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
      // define association here
      this.belongsTo(models.User,{ foreignKey: '' });
      this.belongsTo(models.TaskType,{ foreignKey: '' });
      this.belongsTo(models.LessonStage,{ foreignKey: '' });
      this.hasMany(models.LessonUser,{ foreignKey: '' });
      this.belongsToMany(models.User,{through: models.LessonUser, foreignKey: '', otherKey: '' });
      this.belongsTo(models.FacilityProject,{ foreignKey: '' });
      this.belongsTo(models.ProjectContract,{ foreignKey: '' });
      this.belongsTo(models.ProjectContractVehicle,{ foreignKey: '' });
      this.hasMany(models.Note,{ foreignKey: '' });
      // this.hasMany(models.LessonFile,{ foreignKey: '' });
      this.hasMany(models.LessonDetail,{ foreignKey: '' });
      this.hasMany(models.RelatedTask,{ foreignKey: '' });
      this.hasMany(models.RelatedIssue,{ foreignKey: '' });
      this.hasMany(models.RelatedRisk,{ foreignKey: '' });
      // this.belongsToMany(models.SubTask,{through: models.RelatedTask, foreignKey: '', otherKey: '' });
      // this.belongsToMany(models.SubIssue,{through: models.RelatedIssue, foreignKey: '', otherKey: '' });
      // this.belongsToMany(models.SubRisk,{through: models.RelatedRisk, foreignKey: '', otherKey: '' })

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
  });
  return Lesson;
};