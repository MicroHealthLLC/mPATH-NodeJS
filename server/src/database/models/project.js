'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ProjectUser,{ foreignKey: 'project_id' })
      this.belongsToMany(models.User,{ through: models.ProjectUser, foreignKey: 'project_id' })
      this.hasMany(models.FacilityProject,{ foreignKey: 'project_id' })

      // this.belongsToMany(models.Facility,{ through: models.FacilityProject, foreignKey: 'project_id' })
      // this.belongsToMany(models.FacilityGroup,{ through: models.FacilityProject, foreignKey: 'project_id' })
      
      this.hasMany(models.ProjectFacilityGroup,{foreignKey: 'project_id' })
      
      // this.belongsToMany(models.ProjectGroup,{through: models.ProjectFacilityGroup, foreignKey: 'project_id' })
      // this.belongsToMany(models.Issue,{through: models.FacilityProject, foreignKey: 'project_id' })
      // this.belongsToMany(models.Risk,{through: models.FacilityProject, foreignKey: 'project_id' })
      // this.belongsToMany(models.Lesson,{through: models.FacilityProject, as: "ProjectLesson", foreignKey: 'project_id', otherKey: 'facility_id'  })
      
      this.belongsTo(models.ProjectType,{foreignKey: 'project_type_id' })

      this.hasMany(models.ProjectStatus,{ foreignKey: 'project_id' })
      this.belongsToMany(models.Status,{through: models.ProjectStatus, foreignKey: 'project_id' })
      this.hasMany(models.ProjectTaskType,{ foreignKey: 'project_id' })
      this.belongsToMany(models.TaskType,{ through: models.ProjectTaskType, foreignKey: 'project_id' })
      this.hasMany(models.ProjectIssueType,{ foreignKey: 'project_id' })
      this.belongsToMany(models.IssueType,{ through: models.ProjectIssueType, foreignKey: 'project_id' })
      this.hasMany(models.ProjectIssueSeverity,{ foreignKey: 'project_id' })
      this.belongsToMany(models.Issue,{through: models.ProjectIssueSeverity, foreignKey: 'project_id' })
      this.hasMany(models.ProjectTaskStage,{ foreignKey: 'project_id' })
      this.belongsToMany(models.TaskStage,{through: models.ProjectTaskStage, foreignKey: 'project_id' })
      this.hasMany(models.ProjectRiskStage,{ foreignKey: 'project_id' })
      this.belongsToMany(models.RiskStage,{through: models.ProjectRiskStage, foreignKey: 'project_id' })

      this.hasMany(models.ProjectIssueStage,{ foreignKey: 'project_id' })
      this.belongsToMany(models.IssueStage,{through: models.ProjectIssueStage, foreignKey: 'project_id' })
      this.hasMany(models.FavoriteFilter,{ foreignKey: 'project_id' })
      this.hasMany(models.QueryFilter,{ foreignKey: 'project_id' })

      this.hasMany(models.ProjectLessonStage,{ foreignKey: 'project_id' })
      this.belongsToMany(models.LessonStage,{through: models.ProjectLessonStage, foreignKey: 'project_id' })
      this.hasMany(models.Contract,{ foreignKey: 'project_id' })
      this.hasMany(models.Role,{ foreignKey: 'project_id' })
      this.hasMany(models.RoleUser,{ foreignKey: 'project_id' })
      this.hasMany(models.ProjectContract,{ foreignKey: 'project_id' })
      this.belongsToMany(models.ContractProjectDatum,{through: models.ProjectContract, foreignKey: 'project_id' })
      this.hasMany(models.ProjectContractVehicle,{ foreignKey: 'project_id' })
      this.belongsToMany(models.ContractVehicle,{ through: models.ProjectContractVehicle,foreignKey: 'project_id' })
      // this.hasMany(models.ProjectContractVehicleGroup,{ foreignKey: 'project_id' })

    }
  }
  Project.init({
    name: { type: DataTypes.STRING },
    description: DataTypes.TEXT,
    uuid: DataTypes.STRING,
    project_type_id: DataTypes.STRING,
    status: DataTypes.STRING,
    progress: DataTypes.STRING
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'projects',
    modelName: 'Project',
  });
  return Project;
};