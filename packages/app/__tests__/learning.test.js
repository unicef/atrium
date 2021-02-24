const request = require('supertest')
require('../config/mongoConfig')
const jwt = require('jsonwebtoken')
const app = require('../server')
const seedLearningResources = require('../seeds/learningResourcesSeed')
const userSeed = require('../seeds/seedUserAndLogin')
const { LEARNING_CATEGORIES_ENUM } = require('../../config/unin-constants')
const server = app.listen(1234, () => console.log('Tests running'))

const testResource = {
  title: 'title',
  description: 'description',
  link: 'link',
  category: LEARNING_CATEGORIES_ENUM.OTHER
}

describe('Learning Resources Test', () => {
  let token
  let decoded
  beforeAll(async () => {
    await seedLearningResources()
    const registerResponse = await userSeed.registerUserAndAuthenticate(app)
    token = registerResponse.headers.authorization
    decoded = jwt.decode(token.replace('Bearer ', ''))
  })

  it('Should get learning resources successfully', () => {
    return request(app)
      .get('/api/learning')
      .set('authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBeGreaterThan(0)
      })
  })

  let newResource
  it('Should add resource correctly', () => {
    return request(app)
      .post('/api/learning')
      .set('authorization', token)
      .send({ ...testResource, uploader: decoded.id })
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.resource).toMatchObject(testResource)
        expect(response.body.resource.uploader.name).toBe(
          userSeed.testUser.name
        )
        expect(response.body.resource.likes.length).toBe(0)
        newResource = response.body.resource
      })
  })

  it('Should prevent repeat links', () => {
    return request(app)
      .post('/api/learning')
      .set('authorization', token)
      .send({ ...testResource, uploader: decoded.id })
      .then(response => {
        expect(response.statusCode).toBe(409)
      })
  })

  it('Should add like correctly', () => {
    return request(app)
      .patch(`/api/learning/${newResource._id}/like`)
      .set('authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.resource.likes.length).toBe(1)
        expect(response.body.resource.likes[0].name).toBe(
          userSeed.testUser.name
        )
      })
  })

  it('Should remove like correctly', () => {
    return request(app)
      .patch(`/api/learning/${newResource._id}/like`)
      .set('authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.resource.likes.length).toBe(0)
      })
  })

  it('Should get resource correctly', () => {
    return request(app)
      .get(`/api/learning/${newResource._id}`)
      .set('authorization', token)
      .send({ ...testResource, uploader: decoded.id })
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.resource).toMatchObject(testResource)
      })
  })

  it('Should post a comment to a project correctly', () => {
    return request(app)
      .post(`/api/learning/${newResource._id}/comment`)
      .set('authorization', token)
      .send({ content: 'Comment content' })
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.resource.comments.length).toBe(1)
        expect(response.body.resource.comments[0].content).toBe(
          'Comment content'
        )
      })
  })

  it('Should fail to add a comment if no content is provided', () => {
    return request(app)
      .post(`/api/learning/${newResource._id}/comment`)
      .set('authorization', token)
      .send({ content: '' })
      .then(response => {
        expect(response.statusCode).toBe(400)
      })
  })
})

afterAll(done => {
  server.close(done)
})
