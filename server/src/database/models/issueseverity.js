'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IssueSeverity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  IssueSeverity.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'IssueSeverity',
  });
  return IssueSeverity;
};