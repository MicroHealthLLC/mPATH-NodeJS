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
      this.belongsTo(models.ContractSubCategory,{ foreignKey: '' });
this.belongsTo(models.ContractAgency,{ foreignKey: '' });
this.belongsTo(models.ContractVehicleType,{ foreignKey: '' });
this.belongsTo(models.ContractNumber,{ foreignKey: '' });
this.belongsTo(models.User,{ foreignKey: '' });
this.hasMany(models.ContractProjectDatum,{ foreignKey: '' });
this.hasMany(models.ProjectContractVehicle,{ foreignKey: '' });
this.belongsToMany(models.Project,{through: models.ProjectContractVehicle, foreignKey: '', otherKey: '' });
this.hasMany(models.ContractProjectPocResource,{ foreignKey: '' });
this.belongsToMany(models.ContractProjectPoc,{through: models.ContractProjectPocResource, foreignKey: '', otherKey: '' })

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
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'contract_vehicles',
    modelName: 'ContractVehicle',
  });
  return ContractVehicle;
};