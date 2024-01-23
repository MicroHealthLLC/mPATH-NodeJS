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
    console.log("task params", req.body)
    let params = req.body
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

    return({task: await task.toJSON(), msg: "Task updated successfully" });
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching task " + error });
  }
};
// Function for retrieving user details
const update = async (req, res) => {
  try {

    console.log("task params", req.body)
    let params = req.body
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
  show
};