const bcrypt = require("bcrypt");

const cryptPassword = (password, callback) => {
  // bcrypt.genSalt(10, function(err, salt) {
  //   if (err) 
  //     return callback(err);
 
  //   bcrypt.hash(password, salt, function(err, hash) {
  //     return callback(err, hash);
  //   });
  // });
  var saltRounds = 10
  return bcrypt
  .genSalt(saltRounds)
  .then(salt => {
    console.log('Salt: ', salt)
    return bcrypt.hash(password, salt)
  })
  .then(hash => {
    console.log('Hash: ', hash)
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
        console.log(res) // return true
        return res
      })
      .catch(err => console.error(err.message))
}

module.exports = {
  cryptPassword,
  comparePassword,
}