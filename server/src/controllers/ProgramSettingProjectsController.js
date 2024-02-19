const { db } = require("../database/models");

// Function for retrieving user details
const show = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    const project = await db.Project.findOne({where: {id: req.params.id}})
    let user = await db.User.findOne({where: {email: 'admin@example.com'}})
    let response = await project.build_json_response({user: user, response_for: 'program_settings'})

    return({project: response});

  } catch (error) {
    res.code(500)
    console.log(error.stack)
    return({ error: "Error fetching data "+error });
  }
};

module.exports = {
  show
};