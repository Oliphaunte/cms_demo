const bcrypt = require('bcrypt')

exports.seed = (knex, Promise) =>
  knex('users').del()
    .then(() => {
      return knex('posts').insert([
        { post_title: 'A new post', post_featured_image: '' }
      ])
    });
