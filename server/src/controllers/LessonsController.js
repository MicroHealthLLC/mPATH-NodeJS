const { db } = require("../database/models");

// Function for retrieving user details
const index = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    // const allLessons = await db.Lesson.findAll();
    const lessons = require('../../static_responses/lessons_index.json');

    res.json({ lessons: lessons });

  } catch (error) {
    res.status(500).json({ error: "Error fetching lessons" });
  }
};

const show = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    const allLessons = await db.Lesson.findAll();
    res.json({ allLessons: allLessons });

  } catch (error) {
    res.status(500).json({ error: "Error fetching lessons" });
  }
};

module.exports = {
  index,show
};
