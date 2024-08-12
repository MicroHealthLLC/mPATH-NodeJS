// const { Router } = require("express");
const { index, create } = require("../controllers/PortfolioContractDataController");

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

async function routes(fastify, options) {
  fastify.get("/api/v1/portfolio/contract_project_data", index);
  fastify.post("/api/v1/portfolio/contract_project_data", create);
}
module.exports = routes;
