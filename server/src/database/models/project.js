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
      this.hasMany(models.ProjectUser)
      this.belongsToMany(models.User,{ through: models.ProjectUser})
      this.hasMany(models.FacilityProject)

      this.belongsToMany(models.Facility,{ through: models.FacilityProject })
      this.belongsToMany(models.FacilityGroup,{ through: models.FacilityProject })
      
      this.hasMany(models.ProjectFacilityGroup,{foreignKey: 'project_id' })
      
      // this.belongsToMany(models.ProjectGroup,{through: models.ProjectFacilityGroup, foreignKey: 'project_id' })
      // this.belongsToMany(models.Issue,{through: models.FacilityProject, foreignKey: 'project_id' })
      // this.belongsToMany(models.Risk,{through: models.FacilityProject, foreignKey: 'project_id' })
      // this.belongsToMany(models.Lesson,{through: models.FacilityProject, as: "ProjectLesson", foreignKey: 'project_id', otherKey: 'facility_id'  })
      
      this.belongsTo(models.ProjectType)

      this.hasMany(models.ProjectStatus)
      this.belongsToMany(models.Status,{through: models.ProjectStatus, foreignKey: 'project_id' })
      this.hasMany(models.ProjectTaskType)
      this.belongsToMany(models.TaskType,{ through: models.ProjectTaskType, foreignKey: 'project_id' })
      this.hasMany(models.ProjectIssueType)
      this.belongsToMany(models.IssueType,{ through: models.ProjectIssueType, foreignKey: 'project_id' })
      
      this.hasMany(models.ProjectIssueSeverity)
      this.belongsToMany(models.IssueSeverity,{through: models.ProjectIssueSeverity, foreignKey: 'project_id' })

      this.hasMany(models.ProjectTaskStage)
      this.belongsToMany(models.TaskStage,{through: models.ProjectTaskStage, foreignKey: 'project_id' })
      this.hasMany(models.ProjectRiskStage)
      this.belongsToMany(models.RiskStage,{through: models.ProjectRiskStage, foreignKey: 'project_id' })

      this.hasMany(models.ProjectIssueStage)
      this.belongsToMany(models.IssueStage,{through: models.ProjectIssueStage, foreignKey: 'project_id' })
      this.hasMany(models.FavoriteFilter)
      this.hasMany(models.QueryFilter)

      this.hasMany(models.ProjectLessonStage)
      this.belongsToMany(models.LessonStage,{through: models.ProjectLessonStage, foreignKey: 'project_id' })
      this.hasMany(models.Contract)
      this.hasMany(models.Role)
      this.hasMany(models.RoleUser)
      this.hasMany(models.ProjectContract)
      this.hasMany(models.ProjectContract)
      this.belongsToMany(models.ContractProjectDatum,{through: models.ProjectContract, foreignKey: 'project_id' })
      this.hasMany(models.ProjectContractVehicle)
      this.belongsToMany(models.ContractVehicle,{ through: models.ProjectContractVehicle,foreignKey: 'project_id' })
      // this.hasMany(models.ProjectContractVehicleGroup)

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
    underscored: true

  });
  return Project;
};