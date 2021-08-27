const bcrypt = require('bcryptjs')

let salt = bcrypt.genSaltSync(10)

function hashPass(pass) {
  return  bcrypt.hashSync(pass, salt)
}

function checkPass(pass, hashPass) {
    return bcrypt.compareSync(pass, hashPass)
}

module.exports = {hashPass , checkPass}
