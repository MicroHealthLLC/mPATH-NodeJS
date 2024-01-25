const { db } = require("../database/models");
const jwt = require("jsonwebtoken");

// Function for retrieving user details
const preferences = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    const preferences = require('../../static_responses/preferences.json');

    return({ preferences: preferences });

  } catch (error) {
    res.code(500).json({ error: "Error fetching data" });
  }
};

const current_user = async (req, res) => {
  try {
    var decoded = jwt.verify( req.query.token, process.env.JWT_SECRET_KEY);
    console.log("current user api", decoded)
    let user = await db.User.findOne({where: {id: decoded.userId}})

    // Fetch user profile using req.userId
    const cu = require('../../static_responses/current_user.json');

    return({ current_user: {id: user.id,email: user.email, first_name: user.first_name, last_name: user.last_name} });

  } catch (error) {
    res.code(500)
    return({ error: "Error fetching data " + error });
  }
};

module.exports = {
  preferences,
  current_user
};
