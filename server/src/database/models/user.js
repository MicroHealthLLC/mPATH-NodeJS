'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {msg: "It must be a valid Email address"},
      },
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};