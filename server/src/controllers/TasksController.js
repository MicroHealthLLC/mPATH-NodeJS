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

    const accountableResourceUsers = [];
    const responsibleResourceUsers = [];
    const consultedResourceUsers = [];
    const informedResourceUsers = [];
    const p_accountable_user_ids = _.compact(params.accountable_user_ids.split(","))
    const p_responsible_user_ids = _.compact(params.responsible_user_ids.split(","))
    const p_consulted_user_ids = _.compact(params.consulted_user_ids.split(","))
    const p_informed_user_ids = _.compact(params.informed_user_ids.split(","))

    const resource = task;
    const resourceUsers = await resource.getTaskUsers();
    const accountableUserIds = resourceUsers
      .filter((ru) => ru.accountable)
      .map((ru) => ru.user_id);
    const responsibleUserIds = resourceUsers
      .filter((ru) => ru.responsible)
      .map((ru) => ru.user_id);
    const consultedUserIds = resourceUsers
      .filter((ru) => ru.consulted)
      .map((ru) => ru.user_id);
    const informedUserIds = resourceUsers
      .filter((ru) => ru.informed)
      .map((ru) => ru.user_id);
    
    const usersToDelete = [];
    
    if (p_accountable_user_ids && p_accountable_user_ids.length > 0) {
      p_accountable_user_ids.forEach((uid) => {
        if (uid !== "undefined" && !accountableUserIds.includes(parseInt(uid))) {
          accountableResourceUsers.push({
            user_id: parseInt(uid),
            task_id: resource.id,
            user_type: 'accountable',
          });
        }
      });
      usersToDelete.push(
        ...accountableUserIds.filter(
          (uid) => !p_accountable_user_ids.includes(uid.toString())
        )
      );
    }
    
    if (p_responsible_user_ids && p_responsible_user_ids.length > 0) {
      p_responsible_user_ids.forEach((uid) => {
        if (uid !== "undefined" && !responsibleUserIds.includes(parseInt(uid))) {
          responsibleResourceUsers.push({
            user_id: parseInt(uid),
            task_id: resource.id,
            user_type: 'responsible',
          });
        }
      });
      usersToDelete.push(
        ...responsibleUserIds.filter(
          (uid) => !p_responsible_user_ids.includes(uid.toString())
        )
      );
    }
    
    if (p_consulted_user_ids &&p_consulted_user_ids.length > 0) {
      p_consulted_user_ids.forEach((uid) => {
        if (uid !== "undefined" && !consultedUserIds.includes(parseInt(uid))) {
          consultedResourceUsers.push({
            user_id: parseInt(uid),
            task_id: resource.id,
            user_type: 'consulted',
          });
        }
      });
      usersToDelete.push(
        ...consultedUserIds.filter(
          (uid) => !p_consulted_user_ids.includes(uid.toString())
        )
      );
    }
    
    if (p_informed_user_ids && p_informed_user_ids.length > 0) {
      p_informed_user_ids.forEach((uid) => {
        if (uid !== "undefined" && !informedUserIds.includes(parseInt(uid))) {
          informedResourceUsers.push({
            user_id: parseInt(uid),
            task_id: resource.id,
            user_type: 'informed',
          });
        }
      });
      usersToDelete.push(
        ...informedUserIds.filter(
          (uid) => !p_informed_user_ids.includes(uid.toString())
        )
      );
    }
    
    const recordsToImport = [
      ...accountableResourceUsers,
      ...responsibleResourceUsers,
      ...consultedResourceUsers,
      ...informedResourceUsers,
    ];
    console.log("***recordsToImport", recordsToImport)
    console.log("***recordsToImport", usersToDelete)
    if (usersToDelete.length > 0) {
      resourceUsers
        .filter((ru) => usersToDelete.includes(ru.user_id))
        .forEach((ru) => ru.destroy());
    }
    
    if (recordsToImport.length > 0) {
      // TaskUser.import(recordsToImport);

      const captains = await db.TaskUser.bulkCreate(recordsToImport);

    }
    



    // task = await task.update(params)
    console.log("after update", task)
    const response = require('../../static_responses/projects_index.json');

    return({task: await task.toJSON()});
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching task " + error });
  }
};

module.exports = {
  update,
  show
};