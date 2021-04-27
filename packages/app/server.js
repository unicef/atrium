require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
// const github = require('./lib/github')
require('./config/mongoConfig')
const log = require('./config/log')
const requestUuid = require('./config/requestUuid')
const users = require('./routes/api/users')
const polls = require('./routes/api/polls')
const twitter = require('./routes/api/twitter')
const github = require('./routes/api/github')
const ethers = require('./routes/api/ethers')
const decisions = require('./routes/api/decisions')
const projects = require('./routes/api/projects')
const learning = require('./routes/api/learning')
const discussion = require('./routes/api/discussion')
const reports = require('./routes/api/reports')
const guide = require('./routes/guides')
const { cacheOptions } = require('./config')
const EncryptDecrypt = require('./lib/encryptDecrypt')
const { inviteCacheOptions, resetPasswordCacheOptions } = require('./config')
const favicon = require('serve-favicon')
const encryptDecrypt = new EncryptDecrypt(process.env.ATRIUM_WALLET_SECRET)
const lru = require('lru-cache')
const invitationCache = new lru(inviteCacheOptions)
const resetPasswordCache = new lru(resetPasswordCacheOptions)
const cookieParser = require('cookie-parser')

const app = express()

app.set('invitationCache', invitationCache)
app.set('encryptDecrypt', encryptDecrypt)
app.set('resetPasswordCache', resetPasswordCache)

app.use(favicon(`${__dirname}/public/favicon.png`))
app.use(requestUuid)
app.use(
  cors({
    exposedHeaders: 'Content-Type,Authorization,x-request-uuid',
    credentials: true,
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      callback(null, origin)
    }
  })
)

// Twitter
// const twitter = require('./lib/twitter');

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())
app.use(cookieParser())

// Passport middleware
app.use(passport.initialize())

// Passport config
require('./config/passport')(passport)

// Routes
app.use(
  '/.well-known/pki-validation/*',
  express.static('./public/pki-validation', {
    index: ['80336ED2C0DB3AC88340B88EDAFE994E.txt']
  })
)
app.use('/api/users', users)
app.use('/api/polls', polls)
// app.use("/api/twitter", twitter);
// app.use("/api/github", github);
app.use('/api/ethers', ethers)
app.use('/api/decisions', decisions)
app.use('/api/reports', reports)

app.use('/api/projects', projects)
app.use('/api/learning', learning)
app.use('/api/discussion', discussion)

app.use('/guide', guide)

app.use('/', express.static('./client/build'))
app.use('/*', express.static('./client/build'))

module.exports = app

const port = process.env.PORT || 5000

if (require.main === module) {
  app.listen(port, () => log.info(`Server up and running on port ${port} !`))
}
