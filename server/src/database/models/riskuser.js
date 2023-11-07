'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RiskUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RiskUser.init({
    user_id: DataTypes.INTEGER,
    risk_id: DataTypes.INTEGER,
    timestamps: DataTypes.STRING,
    user_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RiskUser',
  });
  return RiskUser;
};