const { db } = require("../database/models");
const jwt = require("jsonwebtoken");
const { cryptPassword, comparePassword } = require("../utils/helpers");

// Function for verifying JWT token
const verifyToken = (req, res, next) => {
  const auth_header = req.headers["authorization"];
  if (auth_header) {
    const token = auth_header.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.code(401).json({ error: "Invalid token" });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  } else {
    return res.code(401).json({ error: "Token not provided" });
  }
};

// User registration function
const register = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    if (!username) {
      return res.code(400).json({ error: "Username field is required" });
    } else if (!email) {
      return res.code(400).json({ error: "Email field is required" });
    } else if (!password) {
      return res.code(400).json({ error: "Password field is required" });
    } else {
      const user_db = await db.user.findOne({ where: { email } });
      if (user_db) {
        return res.code(400).json({ error: "Email already exists" });
      } else {
        // Hash the password
        const hashedPassword = await cryptPassword(password);
        // Create a user record in the database
        const new_user = await db.user.create({
          username,
          email,
          password: hashedPassword,
        });
        // Generate JWT token
        const token = jwt.sign(
          { userId: new_user.id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );
        return({ message: "User registered successfully", token });
      }
    }
  } catch (error) {
    console.log(error); // Log the caught error for debugging
    return res.code(500).json({ error: "Registration failed" });
  }
};
// User login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("login", req.body)

    if (!email) {
      res.code(400).json({ error: "Email field is required" });
    } else if (!password) {
      res.code(400).json({ error: "Password field is required" });
    } else {
      
      // Find the user by email
      const user_db = await db.User.findOne({ where: { email } });
      
      // console.log("user", user_db)

      if (!user_db) {
        return res.code(404).json({ error: "User not found" });
      } else {
        // Compare the provided password with the hashed password
        const passwordMatch = await comparePassword(password, user_db.encrypted_password);
        if (!passwordMatch) {
          return res.code(401).json({ error: "Invalid password" });
        } else {
          // Generate JWT token
          const token = jwt.sign({ userId: user_db.id }, process.env.JWT_SECRET_KEY,{ expiresIn: "1h" });
          user_hash = {
            id: user_db.id,
            email: user_db.email,
            first_name: user_db.first_name,
            last_name: user_db.last_name,
            title: user_db.title ,
            phone_number: user_db.phone_number,
            address: user_db.address,
            role: user_db.role,
            provider: user_db.provider,
            uid:null,
            login:null,
            status:"active",
            lat:"",
            lng:"",
            country_code:"",
            color:null,
            organization_id:4,
            full_name:"admin@example.com admin@example.com",
            organization:"Test Org"
          }
          res.send({ message: "Login successful", token: token, current_user: user_hash });
        }
      }
    }
  } catch (error) {
    res.code(500).json({ error: "Login failed", message: error });
  }
};

module.exports = {
  verifyToken,
  register,
  login,
};
