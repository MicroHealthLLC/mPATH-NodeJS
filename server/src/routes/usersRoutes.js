const { Router } = require("express");
const { preferences } = require("../controllers/UsersController");

const router = Router();

// Route for all users in adminPanel
router.get("/preferences", preferences);

module.exports = router;