// const { Router } = require("express");
const { 
        index,
        show
      } = require("../controllers/LessonsController");

// const router = Router();
// //Fetch all programs
// router.get("/", index);

// router.get("/:id", show);

// module.exports = router;

async function routes (fastify, options) {
  fastify.get("/api/v1/programs/:id/projects/:project_id/lessons", index);
  fastify.get("/api/v1/programs/:id/lessons/:id", show);
}
module.exports = routes