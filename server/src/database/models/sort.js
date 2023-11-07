'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sort extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sort.init({
    relation: DataTypes.STRING,
    column: DataTypes.STRING,
    order: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sort',
  });
  return Sort;
};