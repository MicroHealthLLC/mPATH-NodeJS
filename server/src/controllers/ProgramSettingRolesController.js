const { db } = require("../database/models");
const {_} = require("lodash") 


const index = async(req, res) => {
  try {
    let task = await db.Task.findOne({where: {id: req.params.id } })

    return({task: await task.toJSON()});
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching task " + error });
  }
}
module.exports = {
  index
};