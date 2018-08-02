import Router     from 'koa-router'
import passport   from 'koa-passport'
import local      from '@/api/_config/passport'
import cloudinary from 'cloudinary'
import cloudinary_config from '@/api/_config/cloudinary'
import knex       from '@/api/models/connection'

cloudinary.config(cloudinary_config)

const passport_config = {
  session: true
}

const router = new Router()

router
  .get('/auth/status', async (ctx) => {
    await ctx.isAuthenticated() ? ctx.status = 200 : ctx.throw(401)
  })
  .post('/auth/login', async (ctx) => {
    await passport.authenticate('local', passport_config, (err, user, info, status) => {
      if (err || !user) return ctx.throw(401)
      if (user) {
        ctx.login(user)
        return ctx.status = 200
      }
    })(ctx)
  })
  .delete('/auth/logout', async (ctx) => {
    await ctx.logout()
    if (! ctx.isAuthenticated()) return ctx.status = 204
  })

  // 
  // Slides
  // 
  .get('/auth/slides', async (ctx) => {
    await knex('slides').select('*')
      .then(res => {
        ctx.status = 200
        return ctx.body = JSON.stringify(res)
      })
      .catch(err => console.error(err))
  })
  .post('/auth/slides', async (ctx) => {
    const { admin_slide } = ctx.request.files;
    let cloudinary_res = ''

    await cloudinary.uploader.upload(admin_slide.path)
      .then(res => {
        console.log("Cloudinary response: " + res)
        cloudinary_res = res.url
      })
      .catch(err => console.error(err))

    return knex('slides').insert({ slide_image: cloudinary_res })
      .then(res => {
        ctx.status = 201
      })
      .catch(err => ctx.status = 406)
  })
  .delete('/auth/slides/:id', async (ctx) => {
    await knex('slides').where('id', ctx.params.id).del()
      .then(res => {
        console.log(`${ctx.params.id} has been delete`)
        ctx.status = 202
      })
      .catch(err => {
        ctx.status = 406
        ctx.throw(406)
      })
  })

  // 
  // Posts
  // 
  .get('/auth/posts', async (ctx) => {
    await knex('posts').select('*')
      .then(res => {
        ctx.status = 200
        return ctx.body = JSON.stringify(res)
      })
      .catch(err => console.error(err))
  })
  .get('/auth/posts/:id', async (ctx) => {
    let { id } = ctx.params

    await knex('posts').where('post_title', id)
      .then(res => {
        ctx.status = 200
        return ctx.body = JSON.stringify(res[0])
      })
      .catch(err => console.error(err))
  })
  .delete('/auth/posts/:id', async (ctx) => {
    let { id } = ctx.params

    await knex('posts').where('post_title', id).del()
      .then(res => ctx.status = 202)
      .catch(err => {
        ctx.status = 406
        ctx.throw(406)
      })
  })
  .post('/auth/posts/new', async (ctx) => {
    let { post_title } = ctx.request.body,
        { post_featured_image } = ctx.request.files;
    
    await cloudinary.uploader.upload(post_featured_image.path)
      .then(res => {
        console.log("Cloudinary response: " + res)
        post_featured_image = res.url
      })
      .catch(err => console.error(err))

    return knex('posts').insert({ post_title, post_featured_image })
      .then(res => ctx.status = 201)
      .catch(err => ctx.status = 406)
  })

export default router