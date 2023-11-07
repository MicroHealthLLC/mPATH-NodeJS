'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContractStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ContractStatus.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ContractStatus',
  });
  return ContractStatus;
};