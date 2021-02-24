require('dotenv').config()
const User = require('../models/User')
const bcrypt = require('bcryptjs')

const ethers = require('../lib/ethers')

const badges = require('../lib/badges')
const mongoose = require('mongoose')
const hash = require('../lib/hash')

// User to be seeded
const email = 'test@test.com'
const password = 'test'

// Connect to mongo
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err))

// Create user
const newUser = new User({
  email,
  emailVerified: true,
  emailHash: hash(email),
  name: 'Test User',
  wallet: ethers.createWallet()
})
console.log(newUser)

// Salt password and update user
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    if (err) throw err
    newUser.password = hash
    newUser
      .save()
      .then(async user => {
        //await badges.issueBadge(1, user.address)
        process.exit(0)
      })
      .catch(err => console.log(err))
  })
})
