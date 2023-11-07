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
    encrypted_password: DataTypes.STRING,
    reset_password_token: DataTypes.STRING,
    reset_password_sent_at: DataTypes.STRING,
    current_sign_in_at: DataTypes.STRING,
    last_sign_in_at: DataTypes.STRING,
    current_sign_in_ip: DataTypes.STRING,
    last_sign_in_ip: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    title: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.STRING,
    provider: DataTypes.STRING,
    uid: DataTypes.STRING,
    login: DataTypes.STRING,
    status: DataTypes.STRING,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    country_code: DataTypes.STRING,
    color: DataTypes.STRING,
    organization_id: DataTypes.STRING

  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};