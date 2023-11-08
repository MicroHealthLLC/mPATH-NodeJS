'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectContract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProjectContract.init({
    project_id: DataTypes.INTEGER,
    contract_project_datum_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    facility_group_id: DataTypes.INTEGER,
    progress: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'project_contracts',
    modelName: 'ProjectContract',
  });
  return ProjectContract;
};