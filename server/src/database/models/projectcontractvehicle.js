'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectContractVehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.ContractVehicle,{ foreignKey: '' });
      this.belongsTo(models.Project,{ foreignKey: '' });
      // this.belongsTo(models.ContractVehicleProject,{ foreignKey: '' });
      // this.belongsTo(models.ContractVehicleFacilityGroup,{ foreignKey: '' });
      this.belongsTo(models.FacilityGroup,{ foreignKey: '' });
      this.hasMany(models.Task,{ foreignKey: '' });
      this.hasMany(models.Issue,{ foreignKey: '' });
      this.hasMany(models.Risk,{ foreignKey: '' });
      this.hasMany(models.Lesson,{ foreignKey: '' });
      this.hasMany(models.Note,{ foreignKey: '' })

    }
  }
  ProjectContractVehicle.init({
    project_id: DataTypes.INTEGER,
    contract_vehicle_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    facility_group_id: DataTypes.INTEGER,
    progeress: DataTypes.INTEGER
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'project_contract_vehicles',
    modelName: 'ProjectContractVehicle',
  });
  return ProjectContractVehicle;
};