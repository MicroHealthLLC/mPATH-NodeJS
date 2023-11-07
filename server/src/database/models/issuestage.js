'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IssueStage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  IssueStage.init({
    name: DataTypes.STRING,
    percentage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'IssueStage',
  });
  return IssueStage;
};