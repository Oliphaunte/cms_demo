exports.up = (knex, Promise) =>
  knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.timestamps(true, true)
  })

exports.down = (knex, Promise) => 
  knex.schema.dropTable('users')