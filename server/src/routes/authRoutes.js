const { 
  register, 
  login, 
  verifyToken,
  googleOauthCallback,
  office365OauthCallback
} = require("../controllers/AuthController");

async function routes (fastify, options) {
  fastify.post("/api/v1/auth/register", register);
  fastify.get("/api/v1/auth/verify_token", verifyToken);
  fastify.post("/api/v1/auth/users/sign_in", login);

  fastify.get('/users/auth/google_oauth2/callback', googleOauthCallback)
  fastify.get('/users/auth/office365/callback', office365OauthCallback)
}
module.exports = routes
