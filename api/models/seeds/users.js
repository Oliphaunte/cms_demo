const bcrypt = require('bcrypt')

exports.seed = (knex, Promise) =>
  knex('users').del()
    .then(() => {
      const salt = bcrypt.genSaltSync()
      const hash = bcrypt.hashSync('admin123', salt)

      return knex('users').insert([
        { email: 'admin@admin.com', password: hash },
      ])
    });
