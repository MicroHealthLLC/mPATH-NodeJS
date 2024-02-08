const { db } = require("../database/models");
const qs = require('qs');
const {_} = require("lodash") 
const {
  Op
} = require('sequelize');

async function index(req, res) {
  try {
    let responseHash = {roles: []};

    let params = qs.parse(req.query)

    let project = await db.Project.findOne({where: {id: params.project_id}});
    let projectUsers = await db.ProjectUser.findAll({where: {project_id: params.project_id}, raw: true})
    let projectUserIds = _.uniq(_.map(projectUsers, function(u){return u.user_id}))


    let roleUsers = await db.RoleUser.findAll({where: { project_id: project.id }});
    let group_role_user_ids = {}
    for(var role_user of roleUsers){
      
      if(group_role_user_ids[role_user.role_id]){
        group_role_user_ids[role_user.role_id].push(role_user)
      }else{
        group_role_user_ids[role_user.role_id] = [role_user]
      }
    }
    // const group_role_user_ids = _.groupBy(roleUsers, 'role_id')
    let role_ids = _.uniq(_.map(roleUsers, function(rs){return rs.role_id}))
    let roles = await db.Role.findAll({where: {id: role_ids}})

    for (const [role_id, roleUsers] of Object.entries(group_role_user_ids)) {
      var role = _.find(roles, function(r){return r.id == parseInt(role_id)})
      let h = await role.toJSON();
      h.role_users = group_role_user_ids[h.id]
      responseHash.roles.push(h);
    }
    // response = response[0]['role_users']
    // response = group_role_user_ids
    let defaultRoles = await db.Role.getDefaultRoles({role_ids: role_ids})

    for (var role of defaultRoles) {
      let h = await role.toJSON();
      //TODO: use eager loading for performance
      h.role_users = await role.getRoleUsers()
      role_ids.push(role.id);
      responseHash.roles.push(h);
    }

    const projectRoles = await db.Role.findAll({
      where: { id: { [Op.notIn]: role_ids }, project_id: project.id }
    });

    for (const role of projectRoles) {
      const h = role.toJSON();
      role_ids.push(role.id);
      responseHash.roles.push(h);
    }

    return(responseHash);
  } catch (error) {
    res.status(500)
    return({ message: "Error fetching roles "+error });
  }
}

module.exports = {
  index
};