const { db } = require("../database/models");
const {_} = require("lodash") 


const show = async(req, res) => {
  try {
    let note = await db.Note.findOne({where: {id: req.params.id } })

    return({note: await note.toJSON()});
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching note " + error });
  }
}

// Function for retrieving user details
const create = async (req, res) => {
  try {
    var qs = require('qs');
    console.log("note body", req.body)
    console.log("note params", req.params)
    let params = qs.parse(req.body)
    let noteParams = params.note
    // const parts = await req.files();
    // console.log("************Files ", parts)

    // for await (const data of parts) {
    //   console.log("*******File being access**********");
    //   console.log(data.filename); // access file name
    // }
    let note = db.Note.build();
    let user = await db.User.findOne({where: {email: 'admin@example.com'}})
    let facilityProject = await db.FacilityProject.findOne({where: {project_id: req.params.program_id, facility_id: req.params.project_id }})
    noteParams['noteable_id'] = facilityProject.id
    noteParams['noteable_type'] = 'FacilityProject'
    
    note.set(noteParams)
    await note.save()

    return({note: await note.toJSON(), msg: "Note created successfully" });
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching note " + error });
  }
};
// Function for retrieving user details
const update = async (req, res) => {
  try {
    var qs = require('qs');
    console.log("note params", qs.parse(req.body))
    let params = qs.parse(req.body)
    let noteParams = params.note
    // const parts = await req.files();
    // console.log("************Files ", parts)

    // for await (const data of parts) {
    //   console.log("*******File being access**********");
    //   console.log(data.filename); // access file name
    // }
    console.log("******note params", noteParams)
    let note = await db.Note.findOne({where: {id: req.params.id } })
    note.set(noteParams)
    note.user_id = 
    await note.save()

    await note.assignUsers(params)
    await note.manageNotes(noteParams)
    await note.manageChecklists(noteParams)
    // note = await note.update(params)
    console.log("after update", note)
    const response = require('../../static_responses/projects_index.json');

    return({note: await note.toJSON(), msg: "Note updated successfully" });
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching note " + error });
  }
};

module.exports = {
  update,
  show,
  create
};