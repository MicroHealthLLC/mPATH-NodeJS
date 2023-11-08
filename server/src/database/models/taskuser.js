'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TaskUser.init({
    user_id: DataTypes.INTEGER,
    task_id: DataTypes.INTEGER,
    user_type: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'task_users',
    modelName: 'TaskUser',
  });
  return TaskUser;
};