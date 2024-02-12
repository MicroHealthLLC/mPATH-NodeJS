const { db }  = require("../database/models/");
const qs = require('qs');
const {_} = require("lodash") 

// Function for retrieving user details
const get_user_privileges = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    const get_user_privileges = require('../../static_responses/get_user_privileges.json');

    return(get_user_privileges);

  } catch (error) {
    res.code(500)
    return({ error: "Error fetching data" });
  }
};
const remove_from_program = async (req, res) => {
  try {
    let params = qs.parse(req.body)
    let user = await db.User.findOne({where: {id: params.user_id}})
    let program = await db.Project.findOne({where: {id: params.program_id}})
    let programAdminRole = await db.Role.programAdminUserRole({})
    console.log("********remove_from_program", params)

    let programAdminUsers = await program.getProgramAdmins()

    let role_id = programAdminRole.id
    var program_admin_user_ids = _.map(programAdminUsers, function(pu){ return pu.user_id})

    console.log("****_without", _.without(program_admin_user_ids, [user.id]) )

    if(_.without(program_admin_user_ids, [user.id]).length < 1){
      res.status(406)
      return({msg: "There must be at least 1 program admin exists in program! Please retry."})
    }else{
      await db.ProjectUser.destroy({where:{project_id: params.program_id, user_id: params.user_id}, truncate: true})
      return({msg: "Users are removed from program successfully!"})
    }

  }catch (error) {
    res.status(500)
    return({ error: "Error removing user from program "+ error });
  }
}
async function add_to_program(req, res){
  try {
    let params = qs.parse(req.body)

    let user = await db.User.findAll({where: {id: params.user_ids}})
    let program = await db.Project.findOne({where: {id: params.program_id}})
    let project_users = await db.ProjectUser.findAll({where: {project_id: params.program_id}})
    let p_user_ids  = _.uniq( _.map(project_users, function(pu){return pu.user_id}) )
    let new_project_users = []

    for(var uid of params.user_ids){
      if(!p_user_ids.includes(parseInt(uid))){
        new_project_users.push({user_id: uid, project_id: program.id})
      }
    }

    if(new_project_users.length > 0){
      await db.ProjectUser.bulkCreate(new_project_users);
    }
        
    return({msg: "Users are added to program successfully!"})

  }catch (error) {
    res.status(500)
    return({ error: "Error adding user to program "+ error });
  }
}

async function index(req, res) {
  try {
    let responseHash = {users: []};

    let params = qs.parse(req.query)
    let users = []
    if(params.all == 'true'){
      
      users = await db.User.findAll({where: {status: 1}})

    }else if(params.program_id){
      let project_users = await db.ProjectUser.findAll({where: {project_id: params.program_id}})
      let user_ids = _.uniq(_.map(project_users, function(pu){return pu.user_id}))
      users = await db.User.findAll({where: {status: 1, id: user_ids}})
    }

    for(var user of users){
      responseHash.users.push(user.toJSON())
    }
    return(responseHash.users)
  } catch (error) {
    res.status(500)
    return({ error: "Error fetching facility groups "+ error });
  }
}

module.exports = {
  get_user_privileges,
  add_to_program,
  remove_from_program,
  index
};
