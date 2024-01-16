// const { Router } = require("express");
const { 
  update
} = require("../controllers/TasksController");

// const router = Router();
// //Fetch all programs
// router.get("/", index);

// router.get("/:id", show);

// module.exports = router;

const updateTaskSchema = {
  consumes: ["multipart/form-data"],
  params: {
    type: 'object',
    required: ['task[text]', 'task[description]'],
    properties: {
      text: {type: 'string'},
      description: {type: 'string'},
    },
  },
  response: {
    200: {type: 'string'}, // a simple message will be sent
  },
};

// const updateTaskSchema = {
//   type: 'object',
//   properties: {
//     text: { type: 'string' },
//     description: { type: 'string' },
//   },
// }


const S = require('fluent-json-schema')

// // You can have an object like this, or query a DB to get the values
// const MY_KEYS = {
//   text: 'text',
//   description: 'description'
// }

// const bodyJsonSchema = S.object()
  // .prop('someKey', S.string())
  // .prop('someOtherKey', S.number())
  // .prop('requiredKey', S.array().maxItems(3).items(S.integer()).required())
  // .prop('nullableKey', S.mixed([S.TYPES.NUMBER, S.TYPES.NULL]))
  // .prop('multipleTypesKey', S.mixed([S.TYPES.BOOLEAN, S.TYPES.NUMBER]))
  // .prop('multipleRestrictedTypesKey', S.oneOf([S.string().maxLength(5), S.number().minimum(10)]))
  // // .prop('enumKey', S.enum(Object.values(MY_KEYS)))
  // .prop('notTypeKey', S.not(S.array()))

  const bodyJsonSchema = S.object().prop('text', S.string())

// const queryStringJsonSchema = S.object()
//   .prop('name', S.string())
//   .prop('excitement', S.integer())

const queryStringJsonSchema = S.object().prop('text', S.string())

// const paramsJsonSchema = S.object()
//   .prop('par1', S.string())
//   .prop('par2', S.integer())
const paramsJsonSchema = S.object().prop('text', S.string())

const headersJsonSchema = S.object()
  // .prop('x-foo', S.string().required())

// Note that there is no need to call `.valueOf()`!
const schema = {
  consumes: ["multipart/form-data"],
  body: bodyJsonSchema,
  querystring: queryStringJsonSchema, // (or) query: queryStringJsonSchema
  params: paramsJsonSchema,
  headers: headersJsonSchema
}

async function routes (fastify, options) {

  fastify.put("/api/v1/programs/:program_id/projects/:project_id/tasks/:id", {schema: schema, handler: update});
}
module.exports = routes

 