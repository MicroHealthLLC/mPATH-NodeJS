'use strict';
const {
  Op, Model, QueryTypes
} = require('sequelize');

const {_} = require("lodash") 

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // define association here
      // this.hasMany(models.ProjectUser,{ foreignKey: 'user_id',onDelete: 'CASCADE', hooks: true })
      // this.belongsToMany(models.Project,{through: models.ProjectUser, foreignKey: 'user_id',otherKey: 'project_id' })

      // this.belongsToMany(models.FacilityProject,{ through: models.ProjectUser, foreignKey: 'user_id',otherKey: 'project_id' })
      // // this.belongsToMany(models.Project,{through: models.ProjectUser, foreignKey: 'user_id',otherKey: 'project_id' })
      // this.hasMany(models.Facility,{ foreignKey: 'creator_id' })
      // this.hasOne(models.Privilege,{ foreignKey: 'user_id',onDelete: 'CASCADE', hooks: true })
      // this.hasMany(models.QueryFilter,{ foreignKey: 'user_id',onDelete: 'CASCADE', hooks: true })
      // this.hasMany(models.ContractPrivilege,{ foreignKey: 'user_id',onDelete: 'CASCADE', hooks: true })
      // this.hasMany(models.FacilityPrivilege,{ foreignKey: 'user_id',onDelete: 'CASCADE', hooks: true })
      // this.hasMany(models.ProjectPrivilege,{ foreignKey: 'user_id',onDelete: 'CASCADE', hooks: true })
      // this.hasMany(models.Contract,{ foreignKey: 'user_id' })
      // this.hasMany(models.RoleUser,{ foreignKey: 'user_id',onDelete: 'CASCADE', hooks: true })
      // this.belongsToMany(models.Role,{through: models.RoleUser, foreignKey: 'user_id',otherKey: 'role_id' })
      // this.hasMany(models.RolePrivilege,{ foreignKey: 'user_id' })
    }
    toJSON() {
      let h = {...super.toJSON()}
      h['status'] = this.getStatus(h['status']) 
      return h;
    }
    hasPermissionByRole(options={}){
      console.log("***** hasPermissionByRole called")
    }
    getFullName(){
      let n = ''
      if(this.first_name){
        n +  n + this.first_name
      }
      if(this.last_name){
        n = n + " " + this.last_name
      }
      return n
    }
    getStatus(v){
      return {
        0: 'inactive', 1: 'active'
      }[v]   
    }
  async authorizedProgramIds(options={}){
    const { db } = require("./index.js");
    var projectUsers = []
    if(options.project_ids){
      projectUsers = await db.ProjectUser.findAll({where: {user_id: this.id,project_id: options.project_ids}})
    }else{
      projectUsers = await db.ProjectUser.findAll({where: {user_id: this.id}})
    }
    var projectIds = _.map(projectUsers, function(pu){return pu.project_id })
    var projects = await db.Project.findAll({where: {id: projectIds, status: 1}})
    return _.map(projects, 'id')
  }
    async getAuthorizedData(options={}){
      const { db } = require("./index.js");
      const {compactAndUniq} = require('../../utils/helpers.js')
      let role_users = await db.RoleUser.findAll({where: {user_id: this.id}})
      let role_ids = _.compact( _.uniq(_.map(role_users, function(f){ return f.role_id } )) )
      let role_privileges = await db.RolePrivilege.findAll({
        where: { 
          role_id: role_ids, 
          privilege: { 
            [Op.regexp]: "^[RWD]" 
          }
        },
      });

      let role_privilege_role_ids = compactAndUniq(_.map(role_privileges, function(f){ return f.role_id } ))
      let role_users2 = await db.RoleUser.findAll({where: {user_id: this.id, role_id: role_privilege_role_ids}})

      let authorized_facility_project_ids = compactAndUniq(_.map(role_users2, function(f){ return f.facility_project_id } ))
      let authorized_project_contract_ids = compactAndUniq(_.map(role_users2, function(f){ return f.project_contract_id } ))
      let authorized_project_contract_vehicle_ids = compactAndUniq(_.map(role_users2, function(f){ return f.project_contract_vehicle_id } ))

      if(options.project_ids){
        var fps = await db.FacilityProject.findAll({where: {id: authorized_facility_project_ids, project_id: options.project_ids }})
        authorized_facility_project_ids = compactAndUniq(_.map(fps, function(f){ return f.id } ))

        var pcs = await db.ProjectContract.findAll({where: {id: authorized_project_contract_ids, project_id: options.project_ids }})
        authorized_project_contract_ids = compactAndUniq(_.map(pcs, function(f){ return f.id } ))

        var pcvs = await db.ProjectContract.findAll({where: {id: authorized_project_contract_vehicle_ids, project_id: options.project_ids }})
        authorized_project_contract_vehicle_ids = compactAndUniq(_.map(pcvs, function(f){ return f.id } ))

      }

      let authorized_data_hash = {
        authorized_facility_project_ids: authorized_facility_project_ids,
        authorized_project_contract_ids: authorized_project_contract_ids,
        authorized_project_contract_vehicle_ids: authorized_project_contract_vehicle_ids
      }
      return authorized_data_hash;
    }

    async programsWithProgramAdminRole(){
      const { db } = require("./index.js");
      const {compactAndUniq} = require('../../utils/helpers.js')
      var programAdminRole = await db.Role.programAdminUserRole()
      var roleUsers = await db.RoleUser.findAll({where: {user_id: this.id}})
      var projectIds = compactAndUniq(_.map(roleUsers, function(rs){return rs.project_id }))
      var projectUsers = await db.ProjectUser.findAll({where: {user_id: this.id}})
      var projectIds2 = compactAndUniq(_.map(projectUsers, function(u){ return u.project_id }))
      var projects = await db.Project.findAll({where: {id: projectIds2}})
      return projects
    }

  }
  User.init({
    // name: DataTypes.STRING,
    full_name: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.first_name} ${this.last_name}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      }
    },
    email: {
      type:DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {msg: "It must be a valid Email address"},
      },
    },
    encrypted_password: DataTypes.STRING,
    // password: DataTypes.STRING,
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
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'users',
    modelName: 'User',
    underscored: true
  });
  // User.hasMany(ProjectUser);
  // User.hasMany(Project);
  // User.hasMany(Facility, {});
  // User.hasMany(FacilityProject, {});
  // User.hasMany(Risk, {});
  // User.hasOne(Privilege, {});
  // User.hasMany(QueryFilter, {});
  // User.hasMany(ContractPrivilege, {});
  // User.hasMany(FacilityPrivilege, {});
  // User.hasMany(ProjectPrivilege, {});
  // User.hasMany(Contract, {});
  // User.hasMany(RoleUser, {});
  // User.hasMany(Role, {});
  // User.hasMany(RolePrivilege, {});

  // User.hasMany(Facility, {});
  // User.belongsTo(Organization, {});
  // User.belongsTo(Organization, {});

  
  return User;
};