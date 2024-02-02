// const { Router } = require("express");
const { 
        index,
        program_lessons,
        show
      } = require("../controllers/LessonsController");

// const router = Router();
// //Fetch all programs
// router.get("/", index);

// router.get("/:id", show);

// module.exports = router;

async function routes (fastify, options) {
  fastify.get("/api/v1/programs/:program_id/lessons", program_lessons);
  fastify.get("/api/v1/programs/:program_id/projects/:project_id/lessons", index);
  fastify.get("/api/v1/programs/:program_id/projects/:project_id/lessons/:id.json", show);
}
module.exports = routes