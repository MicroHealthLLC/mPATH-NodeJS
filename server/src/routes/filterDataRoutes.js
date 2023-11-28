const { Router } = require("express");
const { 
  program_admin_programs
      } = require("../controllers/FilterDataController");

const router = Router();
//Fetch all programs
router.get("/program_admin_programs", program_admin_programs);

module.exports = router;