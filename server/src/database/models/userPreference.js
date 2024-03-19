'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPreference extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  UserPreference.init({
    navigation_menu: DataTypes.STRING,
    sub_navigation_menu: DataTypes.STRING,
    program_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    project_group_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'user_preferences',
    modelName: 'UserPreference',
    underscored: true
  });
  return UserPreference;
};