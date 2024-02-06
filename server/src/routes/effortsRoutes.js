// const { Router } = require("express");
const { 
  index,
  update,
  show,
  create
} = require("../controllers/EffortsController");

async function routes (fastify, options) {
  fastify.get("/api/v1/programs/:program_id/projects/:project_id/efforts",index);
  fastify.post("/api/v1/programs/:program_id/projects/:project_id/efforts",create);
  fastify.put("/api/v1/programs/:program_id/projects/:project_id/efforts/:id",update);
  fastify.get("/api/v1/programs/:program_id/projects/:project_id/efforts/:id",show);
}
module.exports = routes