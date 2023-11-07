'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IssueUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  IssueUser.init({
    user_id: DataTypes.INTEGER,
    issue_id: DataTypes.INTEGER,
    user_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'IssueUser',
  });
  return IssueUser;
};