const { verifyToken } = require("../controllers/AuthController");
// const { Router } = require("express");
const { index } = require("../controllers/ProfilesController");

// const router = Router();

// Middleware for verifying jwt token
// router.use(verifyToken);

// Protected route that requires authentication
// router.use("/", index);

// module.exports = router;

async function routes (fastify, options) {
  fastify.get("/api/v1/profile", index);
}
module.exports = routes