// const { Router } = require("express");
const { 
  update,
  show,
  create
} = require("../controllers/IssuesController");

async function routes (fastify, options) {

  fastify.post("/api/v1/programs/:program_id/projects/:project_id/issues",create);
  fastify.put("/api/v1/programs/:program_id/projects/:project_id/issues/:id",update);
  fastify.get("/api/v1/programs/:program_id/projects/:project_id/issues/:id",show);
}
module.exports = routes