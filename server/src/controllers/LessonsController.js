const { db } = require("../database/models");
const {_} = require("lodash") 

// Function for retrieving user details
const program_lessons = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    // const allLessons = await db.Lesson.findAll();
    const lessons = require('../../static_responses/lessons_index.json');

    return({ lessons: lessons });

  } catch (error) {
    res.code(500).json({ error: "Error fetching lessons" });
  }
};

// Function for retrieving user details
const index = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    // const allLessons = await db.Lesson.findAll();
    const allLessons = require('../../static_responses/lessons_index.json');

    return({ lessons: await allLessons });

  } catch (error) {
    res.code(500)
    return({ error: "Error fetching lessons" });
  }
};

const show = async(req, res) => {
  try {
    let lesson = await db.Lesson.findOne({where: {id: req.params.id } })

    return({lesson: await lesson.toJSON()});
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching lesson " + error });
  }
}

// Function for retrieving user details
const create = async (req, res) => {
  try {
    var qs = require('qs');
    console.log("lesson body", req.body)
    console.log("lesson params", req.params)
    let params = qs.parse(req.body)
    // const parts = await req.files();
    // console.log("************Files ", parts)

    // for await (const data of parts) {
    //   console.log("*******File being access**********");
    //   console.log(data.filename); // access file name
    // }
    let lesson = db.Lesson.build();
    let user = await db.User.findOne({where: {email: 'admin@example.com'}})
    await lesson.createOrUpdateLesson(params,{user: user, project_id: req.params.program_id, facility_id: req.params.project_id})


    return({lesson: await lesson.toJSON(), msg: "Lesson created successfully" });
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching lesson " + error });
  }
};
// Function for retrieving user details
const update = async (req, res) => {
  try {
    var qs = require('qs');
    let params = qs.parse(req.body)
    let lessonParams = params.lesson

    // const parts = await req.files();
    // console.log("************Files ", parts)

    // for await (const data of parts) {
    //   console.log("*******File being access**********");
    //   console.log(data.filename); // access file name
    // }

    let lesson = await db.Lesson.findOne({where: {id: req.params.id } })

    lesson.set(lessonParams)
    await lesson.save()

    await lesson.manageNotes(lessonParams)

    await lesson.addLessonDetail(lessonParams)
    console.log("lesson params", qs.parse(req.body))

    // lesson = await lesson.update(params)
    // console.log("after update", lesson)
    const response = require('../../static_responses/projects_index.json');

    return({lesson: await lesson.toJSON(), msg: "Lesson updated successfully" });
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching lessonParams " + error });
  }
};


module.exports = {
  index,show, program_lessons, update, create
};
