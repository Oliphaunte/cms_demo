const bcrypt = require('bcrypt')

const comparePass = (user_password, db_password) =>
  bcrypt.compareSync(user_password, db_password)

module.exports = {
  comparePass
}