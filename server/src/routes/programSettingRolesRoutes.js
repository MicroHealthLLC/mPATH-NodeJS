// const { Router } = require("express");
const { 
  index,
  add_users
} = require("../controllers/ProgramSettingRolesController");

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
  fastify.get("/api/v1/program_settings/roles", index);
  fastify.post("/api/v1/program_settings/roles/:id/add_users", add_users);
}
module.exports = routes