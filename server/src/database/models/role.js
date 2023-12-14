'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
this.belongsTo(models.Project);
this.hasMany(models.RoleUser);
this.belongsToMany(models.User,{through: models.RoleUser, foreignKey: '', otherKey: '' });
this.hasMany(models.RolePrivilege)

    }
  }
  Role.init({
    name: DataTypes.STRING,
    project_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    is_portfolio: DataTypes.BOOLEAN,
    is_default: DataTypes.BOOLEAN,
    type_of: DataTypes.STRING
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'roles',
    modelName: 'Role',
    underscored: true
  });
  return Role;
};