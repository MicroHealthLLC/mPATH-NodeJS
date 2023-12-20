const { db } = require("../database/models");

// Function for retrieving user details
const index = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    const user_db = await db.User.findByPk(req.userId);
    if (!user_db) {
      return res.code(404).json({ error: "User not found" });
    } else {
      return({ username: user_db.username, email: user_db.email });
    }
  } catch (error) {
    res.code(500).json({ error: "Error fetching profile" });
  }
};

module.exports = {
  index,
};
