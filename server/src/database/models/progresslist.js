'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProgressList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProgressList.init({
    body: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    checklist_id: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'progress_lists',
    modelName: 'ProgressList',
  });
  return ProgressList;
};