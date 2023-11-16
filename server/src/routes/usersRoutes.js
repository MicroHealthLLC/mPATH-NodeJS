const { Router } = require("express");
const { users } = require("../controllers/admin/UsersController");

const router = Router();

// Route for all users in adminPanel
router.get("/", users);

module.exports = router;