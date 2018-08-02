exports.up = (knex, Promise) =>
  knex.schema.createTable('posts', (table) => {
    table.increments()
    table.string('post_title').notNullable()
    table.string('post_featured_image')
    table.timestamps(true, true)
  })

exports.down = (knex, Promise) => 
  knex.schema.dropTable('posts')