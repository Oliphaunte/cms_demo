import Koa                  from 'koa'
import RedisStore           from 'koa-redis'

import serve                from 'koa-static'
import bodyParser           from 'koa-bodyparser'
import session              from 'koa-session'
import views                from 'koa-views'
import passport             from 'koa-passport'
import formidable           from 'koa2-formidable'

import router               from './router'

// Node //
import path                 from 'path'

const 
  PORT = process.env.PORT || 3000,
  SESSION_CONFIG = { 
    store: new RedisStore({
      url: process.env.REDIS_URL,
    }) 
  };

const
  app   = new Koa();

// Middleware
app.keys = [process.env.KOA_KEY]
app
  .use(serve(path.resolve(__dirname, '../dist')))
  .use(formidable())
  .use(bodyParser())
  // Session/Auth
  .use(session(SESSION_CONFIG, app))
  .use(passport.initialize())
  .use(passport.session())
  // Views
  .use(views(path.resolve(__dirname, '../dist/')))
  // Router
  .use(router.routes())
  .use(router.allowedMethods());

// Application Start
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))