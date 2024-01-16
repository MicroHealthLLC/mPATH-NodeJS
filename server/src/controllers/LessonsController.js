const { db } = require("../database/models");

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
    const lessons = require('../../static_responses/lessons_index.json');

    return({ lessons: lessons });

  } catch (error) {
    res.code(500).json({ error: "Error fetching lessons" });
  }
};

const show = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    const allLessons = await db.Lesson.findAll();
    return({ allLessons: allLessons });

  } catch (error) {
    res.code(500).json({ error: "Error fetching lessons" });
  }
};

module.exports = {
  index,show, program_lessons
};
