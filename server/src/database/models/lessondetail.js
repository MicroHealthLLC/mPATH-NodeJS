'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LessonDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LessonDetail.init({
    finding: DataTypes.TEXT,
    recommendation: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    lesson_id: DataTypes.INTEGER,
    detail_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LessonDetail',
  });
  return LessonDetail;
};