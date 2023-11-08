'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContractVehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ContractVehicle.init({
    name: DataTypes.STRING,
    contract_sub_category_id: DataTypes.INTEGER,
    contract_agency_id: DataTypes.INTEGER,
    contract_vehicle_type_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    full_name: DataTypes.TEXT,
    ceiling: DataTypes.DECIMAL,
    base_period_start: DataTypes.DATE,
    base_period_end: DataTypes.DATE,
    option_period_start: DataTypes.DATE,
    option_period_end: DataTypes.DATE,
    contract_number_id: DataTypes.INTEGER,
    caf_fees: DataTypes.DECIMAL,
    subprime_name: DataTypes.TEXT,
    prime_name: DataTypes.TEXT,
    contract_name: DataTypes.TEXT,
    is_subprime: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName: 'contract_vehicles',
    modelName: 'ContractVehicle',
  });
  return ContractVehicle;
};