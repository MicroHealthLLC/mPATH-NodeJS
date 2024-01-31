// const { Router } = require("express");
const { 
  update,
  show,
  create
} = require("../controllers/RisksController");

async function routes (fastify, options) {

  fastify.post("/api/v1/programs/:program_id/projects/:project_id/risks",create);
  fastify.put("/api/v1/programs/:program_id/projects/:project_id/risks/:id",update);
  fastify.get("/api/v1/programs/:program_id/projects/:project_id/risks/:id",show);
}
module.exports = routes