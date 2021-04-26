const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const keys = require('../config/keys')

const authCookieName = 'SESSION_TOKEN'

const jwtCookieExtractor = req => {
  let token = null
  if (req.cookies && req.cookies[authCookieName])
    token = req.cookies[authCookieName]
  return token
}

const opts = {}
opts.jwtFromRequest = jwtCookieExtractor
opts.secretOrKey = keys.SECRET_OR_KEY

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user)
          }
          return done(null, false)
        })
        .catch(err => console.log(err))
    })
  )
}
