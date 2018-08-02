import passport                       from 'koa-passport'
import { Strategy as LocalStrategy }  from 'passport-local'  

import knex                           from '@/api/models/connection'
import authHelpers                    from './helpers'

const local_options = {
  usernameField: 'email'
}

passport.use(new LocalStrategy(local_options, (username, password, done) => {
  knex('users').where({ email: username }).first()
    .then(user => {
      const password_verified = authHelpers.comparePass(password, user.password)

      if (!user) return done(null, false)
      if (!password_verified) return done(null, false)
      return done(null, user)
    })
    .catch(err => done(err));
}))

passport.serializeUser((user, done) => {
  const sessionUser = { id: user.id, email: user.email }
  done(null, sessionUser)
})

passport.deserializeUser((sessionUser, done) => {
  done(null, sessionUser)
})

module.exports = passport