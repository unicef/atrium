const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../server')
const User = require('../models/User')
const userSeed = require('../seeds/seedUserAndLogin')
const { ACTIVITY_ENUM } = require('../../config/unin-constants')

const server = app.listen(1234, () => console.log('Tests running'))

const existingEmailHash = 'auth-test-hash'
const notExistingEmailHash = 'fail-test-hash'
const email = 'successAuthenticationTestRegister@unicef.com'
const testUser = {
  name: 'test',
  password: 'password123',
  password2: 'password123',
  emailHash: existingEmailHash,
  company: 'UNCD',
  role: 'developer'
}

const updateUserInfo = {
  name: 'test é',
  company: 'UNFA',
  role: 'programmer'
}

const changePasswordTest = {
  password: 'password124',
  password2: 'password124'
}

const errorTestUser = {
  name: 'test',
  password2: 'password123',
  emailHash: existingEmailHash
}

describe('User Register Test', () => {
  beforeAll(async () => {
    const newUser = new User({
      email,
      emailVerified: false,
      emailHash: existingEmailHash
    })
    await newUser.save()
    await userSeed.registerUserAndAuthenticate(app)
  })

  it('Should pre-register an email correcty', () => {
    return request(app)
      .post('/api/users/email-to-sign-up')
      .send({ email: 'test@unicef.org' })
      .then(response => {
        expect(response.statusCode).toBe(200)
      })
  })

  it('Should give 403 error if email registrar not allowed', () => {
    return request(app)
      .post('/api/users/email-to-sign-up')
      .send({ email: 'test@test.com' })
      .then(response => {
        expect(response.statusCode).toBe(403)
      })
  })

  it('Should verify an existing email hash successfully', () => {
    return request(app)
      .get(`/api/users/email-verify/${existingEmailHash}`)
      .then(response => {
        expect(response.statusCode).toBe(200)
      })
  })

  it("Should fail verifying an  email hash that doesn't exist", () => {
    return request(app)
      .get(`/api/users/email-verify/${notExistingEmailHash}`)
      .then(response => {
        expect(response.statusCode).toBe(404)
      })
  })

  it('Should fail registering if there are missing fields', () => {
    return request(app)
      .put('/api/users/register/')
      .send(errorTestUser)
      .then(response => expect(response.statusCode).toBe(400))
  })

  it('Should register successfully', () => {
    return request(app)
      .put('/api/users/register/')
      .send(testUser)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.headers.authorization).toBeTruthy()
      })
  })

  let token
  let decoded
  it('Should login successfully', () => {
    return request(app)
      .post('/api/users/login')
      .send({ email, password: testUser.password })
      .then(response => {
        expect(response.statusCode).toBe(200)
        token = response.headers.authorization
        decoded = jwt.decode(token.replace('Bearer ', ''))
        expect(token).toBeTruthy()
        expect(decoded.role).toBe(testUser.role)
        expect(decoded.company).toBe(testUser.company)
      })
  })

  it('Should set learn flag correctly', () => {
    return request(app)
      .post(`/api/users/update-learn-flag/${decoded.id}`)
      .set('authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(token).not.toMatch(response.headers.authorization)
        const decodedToken = jwt.decode(
          response.headers.authorization.replace('Bearer ', '')
        )
        expect(decodedToken.learnPageFlag).toBeTruthy()
      })
  })

  it('Should set explore flag correctly', () => {
    return request(app)
      .post(`/api/users/update-explore-flag/${decoded.id}`)
      .set('authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(token).not.toMatch(response.headers.authorization)
        const decodedToken = jwt.decode(
          response.headers.authorization.replace('Bearer ', '')
        )
        expect(decodedToken.learnPageFlag).toBeTruthy()
      })
  })

  it('Should set engage flag correctly', () => {
    return request(app)
      .post(`/api/users/update-engage-flag/${decoded.id}`)
      .set('authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(token).not.toMatch(response.headers.authorization)
        const decodedToken = jwt.decode(
          response.headers.authorization.replace('Bearer ', '')
        )
        expect(decodedToken.learnPageFlag).toBeTruthy()
      })
  })

  it('Should refresh token successfully', () => {
    return request(app)
      .get('/api/users/refresh-token')
      .set('authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(token).not.toMatch(response.headers.authorization)
        token = response.headers.authorization
        expect(token).toBeTruthy()
      })
  })

  it('Should obtain user history correctly', () => {
    return request(app)
      .get('/api/users/activity')
      .set('authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBeTruthy()
        expect(
          response.body.find(
            a => a.typeOfActivity === ACTIVITY_ENUM.ISSUE_BADGE
          )
        ).toBeTruthy()
      })
  })

  it('Should update user information correctly', async () => {
    const response = await request(app)
      .patch('/api/users')
      .set('authorization', token)
      .send(updateUserInfo)

    expect(response.statusCode).toBe(200)
    expect(token).not.toMatch(response.headers.authorization)
    const decodedToken = jwt.decode(
      response.headers.authorization.replace('Bearer ', '')
    )
    expect(decodedToken.name).toBe(updateUserInfo.name)
    expect(decodedToken.company).toBe(updateUserInfo.company)
    expect(decodedToken.role).toBe(updateUserInfo.role)
  })

  it('Should fail to update user information if extra fields are passed', async () => {
    const response = await request(app)
      .patch('/api/users')
      .set('authorization', token)
      .send({ ...testUser, ...updateUserInfo })

    expect(response.statusCode).toBe(400)
  })

  it('Should fail to change password if extra fields are passed', async () => {
    const response = await request(app)
      .post('/api/users/change-password')
      .set('authorization', token)
      .send(testUser)

    expect(response.statusCode).toBe(400)
  })

  it('Should update password correctly', async () => {
    const response = await request(app)
      .post('/api/users/change-password')
      .set('authorization', token)
      .send(changePasswordTest)
    expect(token).not.toMatch(response.headers.authorization)
    expect(response.statusCode).toBe(200)
  })

  it('Should login with new password correctly', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ email, password: changePasswordTest.password })

    expect(response.statusCode).toBe(200)
  })

  it('Should search for users correctly', async () => {
    const response = await request(app)
      .get('/api/users/search?name=test')
      .set('authorization', token)

    expect(response.statusCode).toBe(200)
    expect(response.body.users.length).toBe(1)
  })

  it('Should retrieve users info correctly', async () => {
    const response = await request(app)
      .get(`/api/users/${decoded.id}`)
      .set('authorization', token)

    expect(response.statusCode).toBe(200)
    expect(response.body.user.id).toBe(decoded.id)
    expect(response.body.userBadges.length).toBeTruthy()
    expect(response.body.activityList.length).toBeTruthy()
  })
})

afterAll(done => {
  server.close(done)
})
