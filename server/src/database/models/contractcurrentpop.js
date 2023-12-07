'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContractCurrentPop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Contract,{ foreignKey: '' });
this.belongsTo(models.User,{ foreignKey: '' })

    }
  }
  ContractCurrentPop.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'contract_current_pops',
    modelName: 'ContractCurrentPop',
  });
  return ContractCurrentPop;
};