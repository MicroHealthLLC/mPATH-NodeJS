'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RelatedTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RelatedTask.init({
    relatable_type: DataTypes.STRING,
    relatable_id: DataTypes.INTEGER,
    task_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RelatedTask',
  });
  return RelatedTask;
};