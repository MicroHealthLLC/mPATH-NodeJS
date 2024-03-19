'use strict';
const {
  fn, Op, Model, QueryTypes
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

    topNavigationHash() {
      return {     
        "sheets_view": "sheet",
        "settings_view": "settings",
        "map_view": "map",
        "gantt_view": "gantt_chart",
        "kanban_view": "kanban",
        "calendar_view": "calendar",
        "members": "members"
      }
    }
    
    async buildNavigationTabsForProfile() {
      const allowedTabs = await this.allowedNavigationTabs();
      const navigationArray = [];
      allowedTabs.forEach(tab => {
        let name = tab === "sheets_view" ? "sheet" : "";
        if (tab === "map_view") name = "map";
        if (tab === "gantt_view") name = "gantt_chart";
        if (tab === "kanban_view") name = "kanban";
        if (tab === "calendar_view") name = "calendar";
        if (tab === "members") name = "members";
        if (name) {
          navigationArray.push({ id: name.toLowerCase(), name: name, value: name.toLowerCase() });
        }
      });
      return navigationArray;
    }
    
    allowedSubNavigationTabs(right = 'R') {
      const facilityPrivileges = this.facilityPrivilegesHash;
      const subNavigationTabs = {};
      for (const facilityId in facilityPrivileges) {
        subNavigationTabs[facilityId] = [];
        for (const moduleId in facilityPrivileges[facilityId]) {
          const modulePrivileges = facilityPrivileges[facilityId][moduleId];
          modulePrivileges.forEach(privilege => {
            if (!["facility_id", "contracts"].includes(privilege.id) && (privilege.value.includes(right) || privilege.value === right)) {
              subNavigationTabs[facilityId].push({ id: privilege.id, name: privilege.name, value: privilege.value });
            }
          });
        }
      }
      return subNavigationTabs;
    }
    
    buildSubNavigationTabsForProfile() {
      return this.allowedSubNavigationTabs();
    }
    
    buildSubNavigationForProgramSettingsTabs(right = "R") {
      const programSettingsPrivileges = this.programSettingsPrivilegesHash;
      const navigationHash = {};
      for (const projectId in programSettingsPrivileges) {
        const privileges = programSettingsPrivileges[projectId];
        for (const moduleType in privileges) {
          const modulePrivileges = privileges[moduleType];
          modulePrivileges.forEach(privilege => {
            if (privilege.value.includes(right) || privilege.value === right) {
              if (!navigationHash[projectId]) navigationHash[projectId] = [];
              navigationHash[projectId].push({ id: privilege.id, name: privilege.name, value: privilege.value });
            }
          });
        }
      }
      return navigationHash;
    }

    async allowedNavigationTabs(right = 'R') {
      const { db } = require("./index.js");

      const navigationTabs = ["sheets_view", "map_view", "gantt_view", "kanban_view", "calendar_view", "members"];
      var privilege = await db.Privilege.findOne({where: {user_id: this.id}})
      var allowedTabs = []
      if(privilege){
        var privilegeHash = privilege.toJSON()
        allowedTabs = Object.keys(privilegeHash).filter(key => {
          const value = privilegeHash[key];
          return typeof value === 'string' && value.includes(right) && navigationTabs.includes(key);
        })
      }       
      return allowedTabs;
    }
    async preferenceUrl() {
      const { db } = require("./index.js");

      const preferences = await this.getPreferences();
      const topNavigations = await this.allowedNavigationTabs();
      let topNavigationHash = this.topNavigationHash()
      let currentTopNavigationMenu = null;
      let url = "/";
      const navigationMenu = preferences.navigation_menu;
      let subNavigationMenu = preferences.sub_navigation_menu;
      if (subNavigationMenu) {
        subNavigationMenu = db.FacilityPrivilege.PRIVILEGE_MODULE[subNavigationMenu];
      }
      
      if (preferences.program_id) {
        url = `/programs/${preferences.program_id}/sheet`;

        if (navigationMenu) {

          let navigationPresent = false;
          if (topNavigations.includes(topNavigationHash[navigationMenu])) {
            url = `/programs/${preferences.program_id}/${navigationMenu}`;
            currentTopNavigationMenu = navigationMenu;
            navigationPresent = true;
            if (["gantt_view", "members"].includes(navigationMenu)) {
              return url;
            }
          } else if (topNavigations.length > 0) {
            url = `/programs/${preferences.program_id}/${topNavigationHash[topNavigations[0]]}`;
            currentTopNavigationMenu = topNavigations[0];
            navigationPresent = true;
            if (["gantt_view", "members"].includes(topNavigations[0])) {
              return url;
            }
          } else {
            url = "/";
          }

          if (navigationPresent && preferences.project_id) {

            if (subNavigationMenu) {

              const subNavigationPrivileges = this.facilityPrivilegesHash[preferences.program_id][preferences.project_id] || {};
              subNavigationPrivileges["analytics"] = subNavigationPrivileges["overview"] || [];
              const subNavigationAllowed = subNavigationPrivileges[subNavigationMenu] && subNavigationPrivileges[subNavigationMenu].length > 0;
              const allowedSubNavigationValues = Object.keys(subNavigationPrivileges).filter(key => Array.isArray(subNavigationPrivileges[key]) && subNavigationPrivileges[key].length > 0);
              if (subNavigationAllowed) {
                if (currentTopNavigationMenu === 'calendar_view' && ["tasks", "issues", "risks"].includes(subNavigationMenu)) {
                  url = `${url}/projects/${preferences.project_id}/${subNavigationMenu}`;
                } else {
                  url = `${url}/projects/${preferences.project_id}/${subNavigationMenu}`;
                }
              } else if (allowedSubNavigationValues.length > 0) {
                if (currentTopNavigationMenu === 'calendar_view' && ["tasks", "issues", "risks"].includes(allowedSubNavigationValues[0])) {
                  url = `${url}/projects/${preferences.project_id}/${allowedSubNavigationValues[0]}`;
                } else {
                  url = `${url}/projects/${preferences.project_id}/${allowedSubNavigationValues[0]}`;
                }
              }
            } else {
              url = `${url}/projects/${preferences.project_id}`;
            }
          }
        }
      }
      return url;
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
    async getPreferences(){
      const { db } = require("./index.js");

      var userPreference = await db.UserPreference.findOne({where: {user_id: this.id} })
      
      return userPreference.toJSON()

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
  
    async hasPermissionByRole(options={}) {
      try {
        const { db } = require("./index.js");
        const {compactAndUniq} = require('../../utils/helpers.js')

        let program = options.program
        let project = options.project
        let action = options.action
        let projectContract = options.project_contract
        let projectContractVehicle = options.project_contract_vehicle
        let resource = options.resource
        let user = this
        const actionCodeHash = { "read": "R", "write": "W", "delete": "D" };

        let roleType;
        let roleUsers = await db.RoleUser.findAll({where: {user_id: user.id}, raw: true})
        let _roleIds = compactAndUniq(_.map(roleUsers, function(f){ return f.role_id } ))
        let _rolePrivileges = await db.RolePrivilege.findAll({
          where: { 
            role_id: _roleIds, 
            privilege: { 
              [Op.regexp]: "^[RWD]" 
            }
          },raw: true
        });
        let roleIds = []
        
        console.log("****** hasPermissionByRole", options)

        if (projectContract) {
            projectContract = await (projectContract instanceof db.ProjectContract ? projectContract : await(db.ProjectContract.findByPk(projectContract.toString())) );

            const programId = projectContract.project_id.toString();
            

            roleIds = _.chain(roleUsers)
                .filter(ru => ru.project_id === parseInt(programId) && ru.project_contract_id === projectContract.id)
                .map('role_id')
                .compact()
                .uniq()
                .value();

            roleType = db.RolePrivilege.CONTRACT_PRIVILEGES_ROLE_TYPES.find(rt => rt.includes(resource));
        } else if (projectContractVehicle) {
            projectContractVehicle = await (projectContractVehicle instanceof db.ProjectContractVehicle ? projectContractVehicle : await(db.ProjectContractVehicle.findByPk(projectContractVehicle.toString())));

            const programId = projectContractVehicle.project_id.toString();

            roleIds = _.chain(roleUsers)
                .filter(ru => ru.project_id === parseInt(programId) && ru.project_contract_vehicle_id === projectContractVehicle.id)
                .map('role_id')
                .compact()
                .uniq()
                .value();

            roleType = db.RolePrivilege.CONTRACT_PRIVILEGES_ROLE_TYPES.find(rt => rt.includes(resource));
        } else {
          const programId = program instanceof db.Project ? program.id.toString() : program.toString();
          const projectId = project instanceof db.Facility ? project.id.toString() : project.toString();
          let facilityProject = await db.FacilityProject.findOne({where: {project_id: programId, facility_id: projectId}})

          roleIds = _.chain(roleUsers)
              .filter(ru => ru.facility_project_id === facilityProject.id)
              .map('role_id')
              .compact()
              .uniq()
              .value();

          roleType = db.RolePrivilege.PROJECT_PRIVILEGES_ROLE_TYPES.find(rt => rt.includes(resource));
        }

        let rolePrivileges = _.filter(_rolePrivileges, function(rp) {return roleIds.includes(rp.role_id) && rp.role_type === roleType})
        rolePrivileges = compactAndUniq(_.map(rolePrivileges, 'privilege').join('').split(''))

        let result = false;
        const shortActionCode = actionCodeHash[action];

        if (shortActionCode === "R") {
          result = rolePrivileges.includes("R") || rolePrivileges.includes("W") || rolePrivileges.includes("D");
        } else {
          result = rolePrivileges.includes(shortActionCode);
        }

        return result;
      } catch (error) {
          console.error(`Exception in hasPermissionByRole: ${error.stack}`);
          return false;
      }
    }

    async projectPrivilegesHashByRole(programIds=[]) {
      try {
        const { db } = require("./index.js");
        const {getCurrentUser, printParams, compactAndUniq} = require('../../utils/helpers.js')

        const user = this;
        if(programIds.length < 1){
          var projectUsers = await db.ProjectUser.findAll({where: {user_id: this.id}})
          programIds = _.map(projectUsers, 'project_id')
        }
        var roleUsers = await db.RoleUser.findAll({
          where: { project_id: programIds },
          attributes: ['role_id'],
          raw: true
        })
        const roleIds = compactAndUniq(_.map(roleUsers, 'role_id'))
    
        const rolePrivileges = await db.RolePrivilege.findAll({
          where: {
            role_id: roleIds,
            role_type: db.RolePrivilege.PROGRAM_SETTINGS_ROLE_TYPES
          },
          attributes: ['name', 'privilege', 'role_type'],
          raw: true
        });
    
        return rolePrivileges;
      } catch (error) {
        console.error("Error fetching project privileges:", error.stack);
        throw error;
      }
    }
    
    async privilegesHashByRole(options={}) {
      try {
        const {getCurrentUser, printParams, compactAndUniq} = require('../../utils/helpers.js')
        const { db } = require("./index.js");

        const user = this;
        console.log("****** privilegesHashByRole", options)
        var programIds = options['programIds'] || []
        var resourceType = options['resourceType'] || 'contract'

        if(programIds.length < 1){
          var projectUsers = await db.ProjectUser.findAll({where: {user_id: this.id}})
          programIds = _.map(projectUsers, 'project_id')
        }

        const resourceHash = {};
    
        let roleUsers;
        if (resourceType === 'contract') {
          roleUsers = await db.RoleUser.findAll({
            where: {
              project_id: programIds,
              project_contract_id: { [Op.not]: null }
            },
            distinct: true
          });
        } else if (resourceType === 'contract_vehicle') {
          roleUsers = await db.RoleUser.findAll({
            where: {
              project_id: programIds,
              project_contract_vehicle_id: { [Op.not]: null }
            },
            distinct: true
          });
        }
    
        const contractRolePrivileges = await db.RolePrivilege.findAll({
          where: {
            role_type: db.RolePrivilege.CONTRACT_PRIVILEGES_ROLE_TYPES,
            role_id: compactAndUniq( roleUsers.map(roleUser => roleUser.role_id) )
          }
        });
    
        if (resourceType === 'contract') {
          roleUsers.forEach(roleUser => {
            const rolePrivileges = contractRolePrivileges.filter(rp => rp.role_id === roleUser.role_id);
            if (roleUser.project_contract_id && rolePrivileges.length > 0) {
              const privilegesObj = {};
              rolePrivileges.forEach(rp => {
                privilegesObj[rp.role_type] = rp.privilege.split('');
              });
              resourceHash[roleUser.project_contract_id] = privilegesObj;
            }
          });
        } else if (resourceType === 'contract_vehicle') {
          roleUsers.forEach(roleUser => {
            const rolePrivileges = contractRolePrivileges.filter(rp => rp.role_id === roleUser.role_id);
            if (roleUser.project_contract_vehicle_id && rolePrivileges.length > 0) {
              const privilegesObj = {};
              rolePrivileges.forEach(rp => {
                privilegesObj[rp.role_type] = rp.privilege.split('');
              });
              resourceHash[roleUser.project_contract_vehicle_id] = privilegesObj;
            }
          });
        }
    
        return resourceHash;
      } catch (error) {
        console.error("Error fetching privileges by role:", error);
        throw error;
      }
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

        var pcvs = await db.ProjectContractVehicle.findAll({where: {id: authorized_project_contract_vehicle_ids, project_id: options.project_ids }})
        authorized_project_contract_vehicle_ids = compactAndUniq(_.map(pcvs, function(f){ return f.id } ))

      }

      let authorized_data_hash = {
        authorized_facility_project_ids: authorized_facility_project_ids,
        authorized_project_contract_ids: authorized_project_contract_ids,
        authorized_project_contract_vehicle_ids: authorized_project_contract_vehicle_ids
      }
      return authorized_data_hash;
    }
    async facilityPrivilegesHashByRole(options={}) {
      try {
        const { db } = require("./index.js");
        const {compactAndUniq} = require('../../utils/helpers.js')

        const user = this;
        console.log("****** privilegesHashByRole", options)
        var programIds = options['programIds'] || []

        if(programIds.length < 1){
          var projectUsers = await db.ProjectUser.findAll({where: {user_id: this.id}})
          programIds = _.map(projectUsers, 'project_id')
        }
        const projectHash = {};
    
        const roleUsers = await db.RoleUser.findAll({
          where: { facility_project_id: { [Op.not]: null } }
        });
    
        let projectRolePrivileges = await db.RolePrivilege.findAll({
          where: {
            role_type: db.RolePrivilege.PROJECT_PRIVILEGES_ROLE_TYPES,
            role_id: [...new Set(roleUsers.map(roleUser => roleUser.role_id))]
          }
        });
        let groupProjectRolePrivileges = _.groupBy(projectRolePrivileges, 'role_id')
    
        roleUsers.forEach(roleUser => {
          const facilityProjectId = roleUser.facility_project_id;
          if (facilityProjectId && groupProjectRolePrivileges[roleUser.role_id.toString()]) {
            const rolePrivileges = groupProjectRolePrivileges[roleUser.role_id.toString()];
            const privilegesObj = {};
            rolePrivileges.forEach(rp => {
              privilegesObj[rp.role_type] = rp.privilege ? rp.privilege.split('') : [];
            });
            projectHash[facilityProjectId] = privilegesObj;
          }
        });
    
        return projectHash;
      } catch (error) {
        console.error("Error fetching facility privileges by role:", error);
        throw error;
      }
    }
    
    async programSettingsPrivilegesHashByRole({ options = {} }) {
      try {

        const { db } = require("./index.js");
        const {compactAndUniq} = require('../../utils/helpers.js')

        const user = this;
        var programIds = options['programIds'] || []

        if(programIds.length < 1){
          var projectUsers = await db.ProjectUser.findAll({where: {user_id: this.id}})
          programIds = _.map(projectUsers, 'project_id')
        }
        var roleUsers = await db.RoleUser.findAll({
          where: { project_id: programIds },
          attributes: [[sequelize.fn('DISTINCT', sequelize.col('role_id')), 'role_id']]
        })
        const roleIds = roleUsers.map(roleUser => roleUser.role_id);
    
        const rolePrivileges = await db.RolePrivilege.findAll({
          where: {
            role_id: roleIds,
            role_type: db.RolePrivilege.PROGRAM_SETTINGS_ROLE_TYPES
          }
        });
    
        const hash = {};
        rolePrivileges.forEach(rp => {
          hash[rp.role_type] = rp.privilege ? rp.privilege.split('') : [];
        });
    
        return hash;
      } catch (error) {
        console.error("Error fetching program settings privileges by role:", error);
        throw error;
      }
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