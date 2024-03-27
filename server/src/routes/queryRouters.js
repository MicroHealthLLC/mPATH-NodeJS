// const { Router } = require("express");
const { 
  index,
  reset
      } = require("../controllers/QueryFiltersController");

// const router = Router();
// //Fetch all programs
// router.get("/", query_filters);


// //Create a program
// router.post("/createprogram", createProgram);
// // Delete a program by ID
// router.delete("/deleteprogram/:id", deleteProgram);
// // Delete all programs
// router.delete("/deleteallprograms", deleteAllPrograms);

// module.exports = router;

async function routes (fastify, options) {
  fastify.get("/api/v1/programs/:id/query_filters", index);
  fastify.post("/api/v1/programs/:id/query_filters/reset", reset);
}
module.exports = routes