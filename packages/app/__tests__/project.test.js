const request = require('supertest')
const app = require('../server')
const GithubLibrary = require('../lib/github')
const userSeed = require('../seeds/seedUserAndLogin')
const server = app.listen(1234, () => console.log('Tests running'))

const exampleProject = {
  name: 'Example project',
  linkToRepository: 'https://github.com/test',
  details: 'details',
  tags: ['tag1', 'tag2'],
  email: 'example@example.com'
}

const updateProjectName = 'Example updated project'

describe('Project management Test', () => {
  let token
  let projectId

  beforeAll(async () => {
    const registerResponse = await userSeed.registerUserAndAuthenticate(app)
    token = registerResponse.headers.authorization
  })

  it('Should begin creation of project correctly', () => {
    GithubLibrary.forkPublicRepoForGithub = jest
      .fn()
      .mockResolvedValue({ data: { html_url: 'result' } })
    return request(app)
      .post('/api/projects/')
      .send(exampleProject)
      .set('authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200)
        // TODO: Github forking is disabled for now
        // expect(response.body.linkToRepository).toBe('result')
        expect(response.body.linkToRepository).toBe(
          exampleProject.linkToRepository
        )
        projectId = response.body._id
      })
  })

  it('Should prevent creation of projects with same name', () => {
    return request(app)
      .post('/api/projects/')
      .send(exampleProject)
      .set('authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(409)
      })
  })

  it('Should prevent creation of projects with url from providers other than github', () => {
    return request(app)
      .post('/api/projects/')
      .send({
        ...exampleProject,
        name: 'Other nane',
        linkToRepository: 'http://example.com'
      })
      .set('authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(400)
      })
  })

  it('Should get a list with all the projects', () => {
    return request(app)
      .get('/api/projects')
      .set('authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.projects.length).toBe(1)
        expect(
          response.body.projects.find(p => p._id === projectId)
        ).toBeTruthy()
      })
  })

  it('Should like the project correctly', () => {
    return request(app)
      .patch(`/api/projects/${projectId}/like`)
      .set('authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.project.likes.length).toBe(1)
      })
  })

  it('Should post a comment to a project correctly', () => {
    return request(app)
      .post(`/api/projects/${projectId}/comment`)
      .set('authorization', token)
      .send({ content: 'Comment content' })
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.project.comments.length).toBe(1)
        expect(response.body.project.comments[0].content).toBe(
          'Comment content'
        )
        expect(response.body.project.comments[0].user.email).toBe(
          userSeed.testUser.email
        )
      })
  })

  it('Should fail to add a comment if no content is provided', () => {
    return request(app)
      .post(`/api/projects/${projectId}/comment`)
      .set('authorization', token)
      .send({ content: '' })
      .then(response => {
        expect(response.statusCode).toBe(400)
      })
  })

  it('Should get the details of a single project', () => {
    return request(app)
      .get(`/api/projects/${projectId}`)
      .set('authorization', token)
      .then(response => {
        const responseProject = response.body.project[0]
        expect(response.statusCode).toBe(200)
        expect(responseProject.name).toBe(exampleProject.name)
        expect(responseProject.details).toBe(exampleProject.details)
        expect(responseProject.email).toBe(exampleProject.email)
        // TODO: github forking is disabled for now
        // expect(responseProject.linkToRepository).toBe('result')
        expect(responseProject.linkToRepository).toBe(
          exampleProject.linkToRepository
        )
        expect(responseProject.owner.name).toBe(userSeed.testUser.name)
        expect(responseProject.tags).toEqual(
          expect.arrayContaining(exampleProject.tags)
        )
        expect(
          responseProject.likes.find(l => l.name === userSeed.testUser.name)
        ).toBeTruthy()
        expect(responseProject.comments.length).toBe(1)
        expect(responseProject.comments[0].content).toBe('Comment content')
        expect(responseProject.comments[0].user.email).toBe(
          userSeed.testUser.email
        )
      })
  })

  it('Should dislike the project correctly', () => {
    return request(app)
      .patch(`/api/projects/${projectId}/like`)
      .set('authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.project.likes.length).toBe(0)
      })
  })

  it('Should update project name correctly', () => {
    return request(app)
      .put(`/api/projects/${projectId}`)
      .set('authorization', token)
      .send({ name: updateProjectName })
      .then(response => {
        const updatedProject = response.body.project
        expect(response.statusCode).toBe(200)
        expect(updatedProject.name).toBe(updateProjectName)
      })
  })

  it('Should prevent from updating link to repository', () => {
    return request(app)
      .put(`/api/projects/${projectId}`)
      .set('authorization', token)
      .send({ linkToRepository: 'test' })
      .then(response => {
        expect(response.statusCode).toBe(400)
      })
  })

  it('Should delete project correctly', () => {
    GithubLibrary.deleteRepoFromGitHub = jest
      .fn()
      .mockResolvedValue({ result: 'true' })
    return request(app)
      .delete(`/api/projects/${projectId}`)
      .set('authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200)
      })
  })
})

afterAll(done => {
  server.close(done)
})
