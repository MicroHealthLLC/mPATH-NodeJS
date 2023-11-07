'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RiskStage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RiskStage.init({
    name: DataTypes.STRING,
    percentage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RiskStage',
  });
  return RiskStage;
};