// const { Router } = require("express");
const { 
  index,
  program_lessons,
  show,
  update,
  create,
  count
} = require("../controllers/LessonsController");

async function checkLessonPermission(req, res, done) {
let action = null;

const { db } = require("../database/models");
const qs = require('qs');
const {_} = require("lodash") 
const {getCurrentUser, printParams, compactAndUniq} = require('../utils/helpers.js')

let body = qs.parse(req.body)
let params = qs.parse(req.params)
let query = qs.parse(req.query)
printParams(req)

// if (["index", "show"].includes(req.params.action)) {
//     action = "read";
// } else if (["create", "update", "create_duplicate", "create_bulk_duplicate", "batch_update"].includes(req.params.action)) {
//     action = "write";
// } else if (["destroy"].includes(req.params.action)) {
//     action = "delete";
// }

let user = await getCurrentUser(req.headers['x-token'])
console.log("********** user", user)

// if (req.query.project_contract_id) {
//     if (!has_contract_permission(req.user, { action: action, resource: 'lessons', project_contract: req.query.project_contract_id })) {
//         return res.status(403).send({ error: "Access Denied" });
//     }
// } else if (req.query.project_contract_vehicle_id) {
//     if (!has_contract_permission(req.user, { action: action, resource: 'risks', project_contract_vehicle: req.query.project_contract_vehicle_id })) {
//         return res.status(403).send({ error: "Access Denied" });
//     }
// } else {
//     if (!has_permission(req.user, { action: action, resource: 'lessons', program: req.query.project_id, project: req.query.facility_id })) {
//         return res.status(403).send({ error: "Access Denied" });
//     }
// }

done();
}


async function routes (fastify, options) {
fastify.use(checkLessonPermission);

fastify.get("/api/v1/programs/:program_id/lessons", program_lessons);
fastify.get("/api/v1/programs/:program_id/projects/:project_id/lessons", index);
fastify.get("/api/v1/programs/:program_id/projects/:project_id/lessons/:id", show);
fastify.post("/api/v1/programs/:program_id/projects/:project_id/lessons", create);
fastify.patch("/api/v1/programs/:program_id/projects/:project_id/lessons/:id", update);
fastify.get("/api/v1/programs/:program_id/lessons/count", count);
}
module.exports = routes