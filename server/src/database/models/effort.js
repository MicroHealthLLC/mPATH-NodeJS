'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Effort extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Effort.init({
    date_of_week: DataTypes.DATE,
    hours: DataTypes.DECIMAL,
    user_id: DataTypes.INTEGER,
    resource_id: DataTypes.INTEGER,
    resource_type: DataTypes.STRING,
    facility_project_id: DataTypes.INTEGER,
    projected: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Effort',
  });
  return Effort;
};