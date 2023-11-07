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
    modelName: 'ProjectContractVehicle',
  });
  return ProjectContractVehicle;
};