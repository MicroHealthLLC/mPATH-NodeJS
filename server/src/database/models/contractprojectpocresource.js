'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContractProjectPocResource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ContractProjectPocResource.init({
    resource_type: DataTypes.STRING,
    resource_id: DataTypes.INTEGER,
    contract_project_poc_id: DataTypes.INTEGER,
    poc_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ContractProjectPocResource',
  });
  return ContractProjectPocResource;
};