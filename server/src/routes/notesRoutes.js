// const { Router } = require("express");
const { 
  update,
  show,
  create
} = require("../controllers/NotesController");

async function routes (fastify, options) {

  fastify.post("/api/v1/programs/:program_id/projects/:project_id/notes",create);
  fastify.put("/api/v1/programs/:program_id/projects/:project_id/notes/:id",update);
  fastify.get("/api/v1/programs/:program_id/projects/:project_id/notes/:id",show);
}
module.exports = routes