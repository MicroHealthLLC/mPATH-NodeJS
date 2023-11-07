'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContractVehicleType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ContractVehicleType.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ContractVehicleType',
  });
  return ContractVehicleType;
};