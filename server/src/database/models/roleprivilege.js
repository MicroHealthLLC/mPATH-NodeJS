'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolePrivilege extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Role)

    }
  }
  RolePrivilege.init({
    role_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    privilege: DataTypes.STRING,
    role_type: DataTypes.STRING
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'role_privileges',
    modelName: 'RolePrivilege',
    underscored: true
  });
  return RolePrivilege;
};