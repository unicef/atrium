const request = require('supertest')
require('../config/mongoConfig')
const app = require('../server')
const seedLearningResources = require('../seeds/learningResourcesSeed')
const userSeed = require('../seeds/seedUserAndLogin')
const server = app.listen(1234, () => console.log('Tests running'))

const testDiscussion = {
  title: 'title',
  content: 'post content',
  type: 'test'
}

describe('Discussion Test', () => {
  let token
  beforeAll(async () => {
    await seedLearningResources()
    const registerResponse = await userSeed.registerUserAndAuthenticate(app)
    token = registerResponse.headers.authorization
  })

  let newDiscussion
  it('Should add resource correctly', () => {
    return request(app)
      .post('/api/discussion')
      .set('authorization', token)
      .send(testDiscussion)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.discussion).toMatchObject(testDiscussion)
        expect(response.body.discussion.user.name).toBe(userSeed.testUser.name)
        expect(response.body.discussion.likes.length).toBe(0)
        newDiscussion = response.body.discussion
      })
  })

  it('Should fail to add if missing field', () => {
    return request(app)
      .post('/api/discussion')
      .set('authorization', token)
      .send({ ...testDiscussion, title: null })
      .then(response => {
        expect(response.statusCode).toBe(400)
      })
  })

  it('Should get learning resources successfully', () => {
    return request(app)
      .get('/api/discussion')
      .set('authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.discussions.length).toBeGreaterThan(0)
      })
  })

  it('Should add like correctly', () => {
    return request(app)
      .patch(`/api/discussion/${newDiscussion.id}/like`)
      .set('authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.discussion.likes.length).toBe(1)
        expect(response.body.discussion.likes[0].name).toBe(
          userSeed.testUser.name
        )
      })
  })

  it('Should remove like correctly', () => {
    return request(app)
      .patch(`/api/discussion/${newDiscussion.id}/like`)
      .set('authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.discussion.likes.length).toBe(0)
      })
  })

  it('Should get discussion correctly', () => {
    return request(app)
      .get(`/api/discussion/${newDiscussion.id}`)
      .set('authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.discussion).toMatchObject(testDiscussion)
      })
  })

  it('Should post a comment to a project correctly', () => {
    return request(app)
      .post(`/api/discussion/${newDiscussion.id}/comment`)
      .set('authorization', token)
      .send({ content: 'Comment content' })
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.discussion.comments.length).toBe(1)
        expect(response.body.discussion.comments[0].content).toBe(
          'Comment content'
        )
      })
  })

  it('Should fail to add a comment if no content is provided', () => {
    return request(app)
      .post(`/api/discussion/${newDiscussion.id}/comment`)
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
