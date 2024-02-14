'use strict';
const {
  Op, Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // define association here
      // this.belongsTo(models.User);
      // this.belongsTo(models.Project);
      this.hasMany(models.RoleUser);
      // this.belongsToMany(models.User,{through: models.RoleUser, foreignKey: '', otherKey: '' });
      this.hasMany(models.RolePrivilege)

    }
    async toJSON(options){
      var _response = this.get({plain: true})
      _response.role_privileges = await this.getRolePrivileges()
      if(options){
        if(options['page'] == 'user_tab_role_assign'){
          _response.facility_projects = []
          _response.contracts = []
        }
        if(options['include'] == 'all' || options['include'] == 'role_users'){
          let role_users = await this.getRoleUsers()
          _response.role_users = []
          for(var rs of role_users){
            var _v = rs.toJSON()
            _v.role_name = this.name
            _response.role_users.push(_v)
          }
        }
      }      
      return _response
    }
    static async programAdminUserRole(){
      const { db } = require("./index.js");

      return await db.Role.findOne({name: "program-admin"})
    }

    static async getDefaultRoles(options){
      const { db } = require("./index.js");

      let defaultRoles = await db.Role.findAll({
        where: { id: { [Op.notIn]: options.role_ids }, is_default: true }
      });
      return defaultRoles
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