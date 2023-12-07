'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContractVehicleNumber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Contract,{ foreignKey: '' })

    }
  }
  ContractVehicleNumber.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'contract_vehicle_numbers',
    modelName: 'ContractVehicleNumber',
  });
  return ContractVehicleNumber;
};