'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContractPrivilege extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ContractPrivilege.init({
    overview: DataTypes.STRING,
    tasks: DataTypes.STRING,
    notes: DataTypes.STRING,
    issues: DataTypes.STRING,
    admin: DataTypes.STRING,
    risks: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    contract_ids: DataTypes.STRING,
    lessons: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ContractPrivilege',
  });
  return ContractPrivilege;
};