exports.up = (knex, Promise) =>
  knex.schema.createTable('slides', (table) => {
    table.increments()
    table.integer('position')
    table.string('slide_image')
    table.timestamps(true, true)
  })

exports.down = (knex, Promise) => 
  knex.schema.dropTable('slides')