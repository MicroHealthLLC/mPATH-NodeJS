const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../database/models");
const qs = require('qs');

function print_params(req){

  let body = qs.parse(req.body)
  let params = qs.parse(req.params)
  let query = qs.parse(req.query)

  console.log("*****body", body)
  console.log("*****params", params)
  console.log("*****query", query)  
}
const cryptPassword = (password, callback) => {
  var saltRounds = 10
  return bcrypt
  .genSalt(saltRounds)
  .then(salt => {
    // console.log('Salt: ', salt)
    return bcrypt.hash(password, salt)
  })
  .then(hash => {
    // console.log('Hash: ', hash)
    return hash
  })
  .catch(err => console.error(err.message))
}

const comparePassword = async(plainPass, hashword, callback) => {
  // bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {
  //   return err == null ?
  //       callback(null, isPasswordMatch) :
  //       callback(err);
  // });
  
  // console.log("plainPass", plainPass)
  // console.log("cpassword", cpassword)
  // console.log("hashword", hashword)

  return bcrypt
      .compare(plainPass, hashword)
      .then(res => {
        return res // return true
      })
      .catch(err => console.error(err.message))
}

const getCurrentUser = async(token) => {
  var decoded = jwt.verify( token, process.env.JWT_SECRET_KEY);
  let user = await db.User.findOne({where: {id: decoded.userId}})
  return user
}

module.exports = {
  cryptPassword,
  comparePassword,
  getCurrentUser,
  print_params
}