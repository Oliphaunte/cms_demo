const bcrypt = require('bcrypt')

const comparePass = async (user_password, db_password) =>
  await bcrypt.compareSync(user_password, db_password)

module.exports = {
  comparePass
}