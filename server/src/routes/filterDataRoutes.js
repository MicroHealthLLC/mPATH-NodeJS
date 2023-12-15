// const { Router } = require("express");
const { 
  program_admin_programs
      } = require("../controllers/FilterDataController");

// const router = Router();
// //Fetch all programs
// router.get("/program_admin_programs", program_admin_programs);

// module.exports = router;

async function routes (fastify, options) {
  fastify.get("/api/v1/filter_data/program_admin_programs", program_admin_programs);
}
module.exports = routes