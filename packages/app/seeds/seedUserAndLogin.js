const request = require('supertest')
const ethers = require('../lib/ethers')
const User = require('../models/User')
const { saltAndHashPassword } = require('../lib/users')

const testUser = {
  name: 'test',
  password: 'password123',
  email: 'successRegister@unicef.com',
  emailHash: 'test-hash',
  role: 'developer',
  company: 'test company'
}

/**
 * Call login endpoint to get token
 *
 * @param {Server} app
 */
const login = app => {
  return request(app)
    .post('/api/users/login/')
    .send({ email: testUser.email, password: testUser.password })
}

/**
 * Seed test user
 */
const initialSeed = () => {
  return new Promise((resolve, reject) => {
    User.find({ email: testUser.email }, async (err, user) => {
      if (err) {
        reject(err)
      }

      if (!user.length) {
        const hashedPassword = await saltAndHashPassword(testUser.password)
        const newUser = new User({
          ...testUser,
          password: hashedPassword,
          wallet: ethers.createWallet()
        })

        await newUser.save()
        return resolve(true)
      }
      return resolve(true)
    })
  })
}

/**
 * Seed test user and authenticate
 * @param {Server} app
 */
const registerUserAndAuthenticate = async app => {
  try {
    await initialSeed()
    const response = await login(app)
    return response
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  testUser,
  login,
  initialSeed,
  registerUserAndAuthenticate
}
