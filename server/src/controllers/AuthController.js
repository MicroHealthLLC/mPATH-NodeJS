const { db } = require("../database/models");
const jwt = require("jsonwebtoken");
const { cryptPassword, comparePassword } = require("../utils/helpers");

// Function for verifying JWT token
const verifyToken = async (req, res, next) => {
  const token = req.query.token;
  
  if (token) {
    try {
      let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      console.log("verify decoded", decoded)
      let user = await db.User.findOne({where: {id: decoded.userId}})
      if(user){
        res.code(200)
        return({ message: "Token is valid" });
      }else{
        res.code(401)
        return({ error: "Invalid token" });
      }
    } catch(err) {
      res.code(401)
      return({ error: err });
    }

  } else {
    res.code(401)
    return({ error: "Token not provided" });
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
      const user = await db.user.findOne({ where: { email } });
      if (user) {
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
    res.code(500)
    return({ error: "Registration failed" });
  }
};

function office365OauthCallback(callbackReq, callbackReply) {
  try {

    let simpleGet = require('simple-get')

    this.office365OAuth2.getAccessTokenFromAuthorizationCodeFlow(callbackReq, async (oauthError, oauthResult) => {

      if (oauthError) {
        callbackReply.send(oauthError)
        return
      }

      const userinfo = await this.googleOAuth2.userinfo(oauthResult.access_token)

      console.log("***** result", userinfo) 
      // simpleGet.concat({
      //   url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      //   method: 'GET',
      //   headers: {
      //     Authorization: 'Bearer ' + oauthResult.access_token
      //   },
      //   json: true
      // }, async function (userinfoError, userinfoRes, userinfoData) {
      //   // console.log("******* data", userinfoData)

      //   if (userinfoError) {
      //     callbackReply.send(userinfoError.stack)
      //     return
      //   }
      //   var email = userinfoData.email;
      //   // // Find the user by email
      //   var user = await  db.User.findOne({ where: { email: email } });
      //   if (!user) {
      //     user = await db.User.create({
      //       email: userinfoData.email,
      //       first_name: userinfoData.name, 
      //       last_name: userinfoData.given_name,
      //       provider: 'google_oauth2'
      //     })
      //   }
        
      //   // // Generate JWT token
      //   const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY,{ expiresIn: "1d" });
      //   user_hash = {
      //     id: user.id,
      //     email: user.email,
      //     first_name: user.first_name,
      //     last_name: user.last_name,
      //     title: user.title ,
      //     phone_number: user.phone_number,
      //     address: user.address,
      //     role: user.role,
      //     provider: user.provider,
      //     uid:null,
      //     login:null,
      //     status:"active",
      //     lat:"",
      //     lng:"",
      //     country_code:"",
      //     color:null,
      //     organization_id:4,
      //     full_name: user.getFullName(),
      //     organization:"Test Org"
      //   }

      //   responseHash = { message: "Login successful", token: token, current_user: user_hash }
      //   // callbackReply.send(responseHash)
      //   callbackReply.redirect('http://localhost:9000/')
      // })
    })

  } catch (error) {
    callbackReply.code(500)
    callbackReply.send({ error: "Login failed", message: error.stack });
  }
}

function googleOauthCallback(callbackReq, callbackReply) {
  
  try {

    let simpleGet = require('simple-get')

    this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(callbackReq, (oauthError, oauthResult) => {

      if (oauthError) {
        callbackReply.send(oauthError)
        return
      }
      // console.log("***** result", oauthResult) 
      simpleGet.concat({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + oauthResult.access_token
        },
        json: true
      }, async function (userinfoError, userinfoRes, userinfoData) {
        // console.log("******* data", userinfoData)

        if (userinfoError) {
          callbackReply.send(userinfoError.stack)
          return
        }
        var email = userinfoData.email;
        // // Find the user by email
        var user = await  db.User.findOne({ where: { email: email } });
        if (!user) {
          user = await db.User.create({
            email: userinfoData.email,
            first_name: userinfoData.name, 
            last_name: userinfoData.given_name,
            provider: 'google_oauth2'
          })
        }
        
        // // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY,{ expiresIn: "1d" });
        user_hash = {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          title: user.title ,
          phone_number: user.phone_number,
          address: user.address,
          role: user.role,
          provider: user.provider,
          uid:null,
          login:null,
          status:"active",
          lat:"",
          lng:"",
          country_code:"",
          color:null,
          organization_id:4,
          full_name: user.getFullName(),
          organization:"Test Org"
        }

        responseHash = { message: "Login successful", token: token, current_user: user_hash }
        // callbackReply.send(responseHash)
        callbackReply.redirect('http://localhost:9000/')
      })
    })

  } catch (error) {
    callbackReply.code(500)
    callbackReply.send({ error: "Login failed", message: error.stack });
  }
}

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
      const user = await db.User.findOne({ where: { email } });
      
      // console.log("user", user)

      if (!user) {
        res.code(404)
        return({ error: "User not found" });
      } else {
        // Compare the provided password with the hashed password
        const passwordMatch = await comparePassword(password, user.encrypted_password);
        if (!passwordMatch) {
          res.code(401) 
          return({ error: "Invalid password" });
        } else {
          // Generate JWT token
          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY,{ expiresIn: "1d" });
          user_hash = {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            title: user.title ,
            phone_number: user.phone_number,
            address: user.address,
            role: user.role,
            provider: user.provider,
            uid:null,
            login:null,
            status:"active",
            lat:"",
            lng:"",
            country_code:"",
            color:null,
            organization_id:4,
            full_name: user.getFullName(),
            organization:"Test Org"
          }
          res.send({ message: "Login successful", token: token, current_user: user_hash });
        }
      }
    }
  } catch (error) {
    res.code(500)
    return({ error: "Login failed", message: error });
  }
};

module.exports = {
  verifyToken,
  register,
  login,
  googleOauthCallback,
  office365OauthCallback
};
