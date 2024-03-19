
const { 
  index,
  currentProfile,
  update
} = require("../controllers/ProfilesController");

// const router = Router();

// Middleware for verifying jwt token
// router.use(verifyToken);

// Protected route that requires authentication
// router.use("/", index);

// module.exports = router;

async function routes (fastify, options) {
  fastify.get("/api/v1/profile", index);
  fastify.get("/api/v1/current_profile", currentProfile);
  fastify.post("/api/v1/profile", update);
}
module.exports = routes