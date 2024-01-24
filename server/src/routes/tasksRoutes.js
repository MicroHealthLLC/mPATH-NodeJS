// const { Router } = require("express");
const { 
  update,
  show,
  create
} = require("../controllers/TasksController");

async function routes (fastify, options) {

  fastify.post("/api/v1/programs/:program_id/projects/:project_id/tasks",create);
  fastify.put("/api/v1/programs/:program_id/projects/:project_id/tasks/:id",update);
  fastify.get("/api/v1/programs/:program_id/projects/:project_id/tasks/:id",show);
}
module.exports = routes