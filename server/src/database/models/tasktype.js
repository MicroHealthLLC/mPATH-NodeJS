'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TaskType.init({
    name: DataTypes.STRING,
    progress: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'task_types',
    modelName: 'TaskType',
  });
  return TaskType;
};