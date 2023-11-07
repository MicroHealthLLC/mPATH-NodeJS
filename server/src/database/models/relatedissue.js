'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RelatedIssue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RelatedIssue.init({
    relatable_type: DataTypes.STRING,
    relatable_id: DataTypes.INTEGER,
    issue_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RelatedIssue',
  });
  return RelatedIssue;
};