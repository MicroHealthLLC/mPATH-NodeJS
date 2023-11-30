const { Router } = require("express");
const { preferences, current_user } = require("../controllers/UsersController");

const router = Router();

// Route for all users in adminPanel
router.get("/preferences", preferences);
router.get("/current_user", current_user);

module.exports = router;