const { db } = require("../database/models");
const {_} = require("lodash") 


const show = async(req, res) => {
  try {
    let task = await db.Task.findOne({where: {id: req.params.id } })

    return({task: await task.toJSON()});
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching task " + error });
  }
}

// Function for retrieving user details
const create = async (req, res) => {
  try {
    var qs = require('qs');
    console.log("task body", req.body)
    console.log("task params", req.params)
    let params = qs.parse(req.body)
    // const parts = await req.files();
    // console.log("************Files ", parts)

    // for await (const data of parts) {
    //   console.log("*******File being access**********");
    //   console.log(data.filename); // access file name
    // }
    let task = db.Task.build();
    let user = await db.User.findOne({where: {email: 'admin@example.com'}})
    await task.createOrUpdateTask(params,{user: user, project_id: req.params.program_id, facility_id: req.params.project_id})


    return({task: await task.toJSON(), msg: "Task created successfully" });
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching task " + error });
  }
};
// Function for retrieving user details
const update = async (req, res) => {
  try {
    var qs = require('qs');
    console.log("task params", qs.parse(req.body))
    let params = qs.parse(req.body)
    // const parts = await req.files();
    // console.log("************Files ", parts)

    // for await (const data of parts) {
    //   console.log("*******File being access**********");
    //   console.log(data.filename); // access file name
    // }

    let task = await db.Task.findOne({where: {id: req.params.id } })
    task.set(params)
    await task.save()

    await task.assignUsers(params)
    await task.manageNotes(params)
    await task.manageChecklists(params)
    // task = await task.update(params)
    console.log("after update", task)
    const response = require('../../static_responses/projects_index.json');

    return({task: await task.toJSON(), msg: "Task updated successfully" });
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching task " + error });
  }
};

module.exports = {
  update,
  show,
  create
};