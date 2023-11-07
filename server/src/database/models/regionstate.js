'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RegionState extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RegionState.init({
    facility_group_id: DataTypes.INTEGER,
    state_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RegionState',
  });
  return RegionState;
};