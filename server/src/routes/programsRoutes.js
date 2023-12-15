// const { Router } = require("express");
const { 
        index,
        show 
      } = require("../controllers/ProjectsController");

// const router = Router();
// //Fetch all programs
// router.get("/", index);

// router.get("/:id", show);

// //Create a program
// router.post("/createprogram", createProgram);
// // Delete a program by ID
// router.delete("/deleteprogram/:id", deleteProgram);
// // Delete all programs
// router.delete("/deleteallprograms", deleteAllPrograms);

// module.exports = router;

async function routes (fastify, options) {
  fastify.get("/api/v1/programs/", index);
  fastify.get("/api/v1/programs/:id", show);
}
module.exports = routes