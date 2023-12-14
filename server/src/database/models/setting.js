'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Setting.init({
    office365_key: DataTypes.TEXT,
    office365_secret: DataTypes.TEXT,
    google_map_key: DataTypes.TEXT,
    google_oauth_key: DataTypes.TEXT,
    google_oauth_secret: DataTypes.TEXT,
    passwords_key: DataTypes.TEXT
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'settings',
    modelName: 'Setting',
    underscored: true
  });
  return Setting;
};