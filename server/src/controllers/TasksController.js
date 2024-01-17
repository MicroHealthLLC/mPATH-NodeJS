const { db } = require("../database/models");
const {_} = require("lodash") 
// Function for retrieving user details
const update = async (req, res) => {
  try {

    console.log("task params", req.body)
    // const parts = await req.files();
    // console.log("************Files ", parts)

    // for await (const data of parts) {
    //   console.log("*******File being access**********");
    //   console.log(data.filename); // access file name
    // }
    const response = require('../../static_responses/projects_index.json');

    return({ projects: response });
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching task " + error });
  }
};

module.exports = {
  update
};