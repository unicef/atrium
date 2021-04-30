const express = require('express'),
  router = new express.Router(),
  Project = require('../../models/Project'),
  Comment = require('../../models/Comment'),
  User = require('../../models/User'),
  Update = require('../../models/Update'),
  { createNewComment } = require('../../lib/comments'),
  { createNewUpdate } = require('../../lib/updates'),
  GithubLibrary = require('../../lib/github'),
  BadgesLibrary = require('../../lib/badges'),
  passport = require('passport'),
  log = require('../../config/log'),
  {
    sendError,
    getAuthenticatedRequestLogDetails
  } = require('../../lib/requestUtils'),
  { s3Upload, s3Download } = require('../../middleware'),
  {
    logProjectCreation,
    logProjectComment,
    logProjectUpdate,
    logProjectLike,
    logIssueBadge
  } = require('../../lib/userActivity'),
  { BADGE_ENUM } = require('../../config/unin-constants')
const mongoose = require('mongoose')
const userFieldSelection = 'name email avatar company' // select only name and email from users
const populateParams = [
  {
    path: 'likes',
    select: userFieldSelection
  },
  {
    path: 'updates',
    populate: [
      {
        path: 'owner',
        select: userFieldSelection
      }
    ]
  },
  {
    path: 'team',
    select: userFieldSelection
  },
  {
    path: 'owner',
    select: userFieldSelection
  },
  {
    path: 'contactPerson',
    select: userFieldSelection
  },
  {
    path: 'comments',
    populate: [
      {
        path: 'user',
        select: userFieldSelection
      },
      {
        path: 'mentions',
        select: userFieldSelection
      }
    ]
  }
]

/**
 * This function a filter string with many possible values
 * and returns the projects that match any value of the strings
 * @param {String} dataKey - e.g. blockchainName
 * @param {String} values - e.g. "Bitcoin,Stellar,Corda"
 */
 const filterMultipleValues = async (dataKey, values) => {
  const parsedValues = values.split(',').join('|')
  const regex = new RegExp("\\b(?:" + parsedValues + ")\\b", "gi")

  return await Project.find({ [dataKey]: regex }).populate(populateParams).exec()
}

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id
      },
      'User is getting projects'
    )
    let projects = []
    let pageCounter = 0
    try {
      projects = await Project.find().populate(populateParams)
      if (req.query.name) {
        projects = projects.filter(project =>
          project.name.toLowerCase().includes(req.query.name.toLowerCase())
        )
      }
      if (req.query.blockchainName) {
        projects = await filterMultipleValues('blockchainName', req.query.blockchainName)
      }
      if (req.query.stageOfProject) {
        projects = await filterMultipleValues('stageOfProject', req.query.stageOfProject)
      }
      if (req.query.innovationCategory) {
        projects = await filterMultipleValues('innovationCategory', req.query.innovationCategory)
      }
      if (req.query.thematicArea) {
        projects = await filterMultipleValues('thematicArea', req.query.thematicArea)
      }
      if (req.query.sort === 'asc') {
        projects = projects.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        )
      } else {
        projects = projects.sort((a, b) =>
          a.name < b.name ? 1 : b.name < a.name ? -1 : 0
        )
      }
      pageCounter = Math.ceil(projects.length / req.query.limit)
      projects = projects.splice(req.query.offset, req.query.limit)
      log.info(
        {
          requestId: req.id,
          projects,
          pageCounter
        },
        'Success getting project list'
      )
      return res.status(200).json({ projects, pageCounter })
    } catch (error) {
      log.info(
        {
          requestId: req.id,
          error: error
        },
        'Can not get projects from the database'
      )
      return sendError(res, 503, 'Error getting projects from the database')
    }
  }
)

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        project: req.params.id
      },
      'Getting single project details'
    )
    Project.find({ _id: req.params.id })
      .populate(populateParams)
      .exec((err, project) => {
        if (err) {
          log.error(
            {
              err,
              requestId: req.id,
              user: req.user.id,
              project: req.params.id
            },
            'Success getting project list'
          )
          return sendError(res, 503, 'Error getting project from the database')
        }
        log.info(
          {
            requestId: req.id,
            user: req.user.id,
            project
          },
          'Success getting project details'
        )

        return res.status(200).json({ project })
      })
  }
)

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  s3Upload.single('attachment'),
  (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        project: req.body
      },
      'Creating project'
    )

    Project.findOne({ name: req.body.name }).then(async project => {
      const address = req.body.address
      if (project) {
        log.warn(
          {
            requestId: req.id,
            user: req.user.id,
            newProject: req.body,
            existingProject: project
          },
          'Error creating project. Name already exists'
        )
        return sendError(
          res,
          409,
          'Project with this name already exists. Please use another name'
        )
      }

      const hasRepositoryLink = !!req.body.linkToRepository

      if (
        hasRepositoryLink &&
        !req.body.linkToRepository.includes('https://github.com/')
      ) {
        log.warn(
          {
            requestId: req.id,
            user: req.user.id,
            project: req.body
          },
          'Error creating project. Only github projects are allowed'
        )
        return sendError(
          res,
          400,
          'Please ensure that the format of the repo url is: https://github.com/{USER}/{REPO_NAME}'
        )
      }

      const contactPerson = await User.findOne({
        email: req.body.contactPersonEmail
      })
      const linkToRepository = req.body.linkToRepository
      const newProject = new Project({
        name: req.body.name,
        details: req.body.details,
        owner: req.user.id,
        projectOwner: req.body.projectOwner,
        projectOwnerEmail: req.body.projectOwnerEmail,
        attachment: req.file // Bandaid until I can un-eff the entire attachment thing
          ? `${req.connection.encrypted ? 'https' : 'http'}://${
              req.headers.host
            }${req.baseUrl}/attachment/${req.file.key}`
          : null,
        documents: [],
        photos: [],
        videos: [],

        blockchainName: req.body.blockchainName,
        blockchainType: req.body.blockchainType,
        freeForAll: req.body.freeForAll,
        published: false,
        stageOfProject: req.body.stageOfProject,
        innovationCategory: req.body.innovationCategory,
        thematicArea: req.body.thematicArea,
        contactPersonFullName: req.body.contactPersonFullName,
        contactPersonEmail: req.body.contactPersonEmail,
        contactPerson: contactPerson._id,

        websiteLink: req.body.websiteLink,
        tags: req.body.tags ? req.body.tags.split(',') : [],
        linkToDeployedApp: req.body.linkToDeployedApp,
        createdAt: Date.now(),
        linkToRepository: linkToRepository,
        email: req.body.email,
        team: []
      })
      return newProject
        .save()
        .then(async project => {
          if (address) {
            const hasBadge = await BadgesLibrary.hasBadge(
              BADGE_ENUM.CONTRIBUTOR,
              address
            )
            if (!hasBadge) {
              await BadgesLibrary.issueBadge(BADGE_ENUM.CONTRIBUTOR, address)
              await logIssueBadge(req.user.id, BADGE_ENUM.CONTRIBUTOR)
            }
          }
          const user = await User.findOne({ _id: req.user.id })
          user.projects.push(project)
          await user.save()
          log.info(
            {
              requestId: req.id,
              user: req.user.id,
              project: project
            },
            'Project saved successfully'
          )
          await logProjectCreation(req.user.id, project.id)
          return res.json(project)
        })
        .catch(err => {
          log.error(
            {
              err,
              requestId: req.id,
              user: req.user.id,
              project: newProject
            },
            'Error saving new project'
          )
          return sendError(
            res,
            503,
            'Error saving the project into the database. Please try again'
          )
        })
    })
  }
)

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  s3Upload.fields([
    { name: 'attachment', maxCount: 1 },
    { name: 'documents', maxCount: 15 },
    { name: 'photos', maxCount: 15 },
    { name: 'videos', maxCount: 15 }
  ]),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        projectUpdate: req.body,
        project: req.params.id
      },
      'Updating project'
    )

    if (req.body.createdAt) {
      log.warn(
        {
          requestId: req.id,
          user: req.user.id,
          project: req.params.id
        },
        'Error updating project. Cannot update date of creation'
      )
      return sendError(
        res,
        400,
        'User is not allowed to update the createdAt field'
      )
    }

    const oldProject = await Project.findOne({ _id: req.params.id })
    // Updates can be name, details, owner, tags, deployed app link
    const projectData = {
      ...req.body,
      tags: req.body.tags ? req.body.tags.split(',') : [],
      attachment:
        req.files && req.files.attachment // How do I relative path?
          ? `${req.connection.encrypted ? 'https' : 'http'}://${
              req.headers.host
            }${req.baseUrl}/attachment/${req.files.attachment[0].key}`
          : null,
      documents:
        req.files && req.files.documents
          ? [
              ...oldProject.documents,
              `${req.connection.encrypted ? 'https' : 'http'}://${
                req.headers.host
              }${req.baseUrl}/attachment/${req.files.documents[0].key}`
            ]
          : [...oldProject.documents],
      videos:
        req.files && req.files.videos
          ? [
              ...oldProject.videos,
              `${req.connection.encrypted ? 'https' : 'http'}://${
                req.headers.host
              }${req.baseUrl}/attachment/${req.files.videos[0].key}`
            ]
          : [...oldProject.videos],
      photos:
        req.files && req.files.photos
          ? [
              ...oldProject.photos,
              `${req.connection.encrypted ? 'https' : 'http'}://${
                req.headers.host
              }${req.baseUrl}/attachment/${req.files.photos[0].key}`
            ]
          : [...oldProject.photos]
    }
    Object.keys(projectData).forEach(
      key => projectData[key] == null && delete projectData[key]
    )

    Project.findOneAndUpdate(
      { _id: req.params.id },
      projectData,
      { new: true },
      (err, project) => {
        if (err) {
          log.error(
            {
              err,
              requestId: req.id,
              user: req.user.id,
              project: req.params.id
            },
            'Error saving updated project'
          )
          return sendError(res, 503, 'Error updating the project')
        }
        log.info(
          {
            requestId: req.id,
            user: req.user.id,
            project
          },
          'Project updated successfully'
        )
        return res.status(200).json({ project })
      }
    )
  }
)

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        project: req.params.id
      },
      'Deleting project'
    )

    Project.findByIdAndDelete({ _id: req.params.id }, async (err, response) => {
      if (err) {
        log.error(
          {
            err,
            requestId: req.id,
            user: req.user.id,
            project: req.params.id
          },
          'Error deleting project'
        )
        return sendError(
          res,
          503,
          'Error deleting the project. Please try again'
        )
      }

      if (!response) {
        log.warn(
          {
            requestId: req.id,
            user: req.user.id,
            project: req.params.id
          },
          'Project not found'
        )
        return sendError(
          res,
          400,
          'Project not found. Please check your id and try again'
        )
      }

      log.info(
        {
          requestId: req.id,
          user: req.user.id,
          project: req.params.id
        },
        'Project deleted successfully'
      )

      const pathOfOwnerAndRepo = response.linkToRepository.replace(
        'https://github.com/',
        ''
      )
      const [owner, repo] = pathOfOwnerAndRepo.split('/')
      // Project is to be kept on GitHub for now
      try {
        log.info(
          {
            requestId: req.id,
            user: req.user.id,
            project: req.params.id
          },
          'Deleting project from github'
        )
        // await GithubLibrary.deleteRepoFromGitHub(owner, repo)

        log.info(
          {
            requestId: req.id,
            user: req.user.id,
            project: req.params.id
          },
          'Project deleted successfully from github'
        )
        return res.json({
          message: 'Repo is removed from the database and GitHub!'
        })
      } catch (err) {
        log.error(
          {
            err,
            requestId: req.id,
            user: req.user.id,
            project: req.params.id
          },
          'Error deleting project from github'
        )
        return sendError(
          res,
          424,
          'Error removing repo from GitHub. Please try again'
        )
      }
    })
  }
)

router.patch(
  '/:id/like',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        project: req.params.id
      },
      'User is liking project'
    )

    const userId = req.user.id
    Project.findOne({ _id: req.params.id }).exec((err, project) => {
      if (err) {
        log.info(
          {
            err,
            requestId: req.id,
            user: req.user.id,
            project: req.params.id
          },
          'Error finding project'
        )
        return sendError(res, 503, 'Error liking project')
      }

      let isLiked = false
      let likes = project.likes
        ? project.likes.filter(l => {
            const isCurrentUser = l.equals(userId)
            if (isCurrentUser) {
              isLiked = true
            }
            return !isCurrentUser
          })
        : []

      if (!isLiked) {
        likes = [...likes, userId]
      }

      project.likes = likes
      project
        .save()
        .then(() => {
          log.info(
            {
              requestId: req.id,
              user: req.user.id,
              project: req.params.id
            },
            'Project liked successfully'
          )
          project.populate(populateParams, async (err, project) => {
            if (err) {
              log.err(
                {
                  err,
                  requestId: req.id,
                  user: req.user.id,
                  project: req.params.id
                },
                'Error populating fields'
              )
              return sendError(res, 503, 'Error liking project')
            }
            log.info(
              {
                requestId: req.id,
                user: req.user.id,
                project: project
              },
              'Fields populated successfully'
            )

            if (!isLiked) {
              await logProjectLike(req.user.id, project.id)
            }
            return res.status(200).json({ project })
          })
        })
        .catch(err => {
          log.error(
            {
              err,
              requestId: req.id,
              user: req.user.id,
              project: req.params.id
            },
            'Error saving project'
          )
          return sendError(res, 503, 'Error liking project')
        })
    })
  }
)

router.get('/download/:s3key', (req, res) => {
  res.setHeader('Content-Disposition', 'download')
  s3Download(req.params.s3key).pipe(res)
})

router.get('/attachment/:s3key', async (req, res) => {
  log.info(getAuthenticatedRequestLogDetails(req), 'Getting attachment')
  try {
    s3Download(req.params.s3key).pipe(res)
  } catch (err) {
    log.error({ err, requestId: req.id }, 'Failed to get project attachment')
  }
})

router.put(
  '/:_id/comment/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { _id } = req.params
    const userId = req.user.id
    const logData = {
      requestId: req.id,
      user: userId,
      comment: _id
    }

    const { content } = req.body

    log.info(logData, 'Editing comment')

    try {
      await Comment.updateOne({ _id }, { $set: { content } })
    } catch (e) {
      log.error(logData, 'Error editing comment')
      return sendError(res, 503, 'Error Editing the comment. Please try again')
    }

    log.info(logData, 'Succesfully Editted comment')
    res.send()
  }
)

router.delete(
  '/:commentId/comment/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { commentId } = req.params
    const userId = req.user.id
    const logData = {
      requestId: req.id,
      user: userId,
      comment: commentId
    }

    log.info(logData, 'Deleting comment')

    try {
      await Project.update(
        {},
        { $pull: { comments: { $in: [mongoose.Types.ObjectId(commentId)] } } }
      )
      await Comment.findByIdAndDelete({ _id: commentId, user: userId })
    } catch (e) {
      log.error(logData, 'Error deleting comment')
      return sendError(res, 503, 'Error deleting the comment. Please try again')
    }

    log.info(logData, 'Comment deleted successfully')

    res.send()
  }
)

router.post(
  '/:id/comment',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        project: req.params.id
      },
      'User is commenting project'
    )

    if (!req.body.content) {
      log.warn(
        {
          requestId: req.id,
          user: req.user.id,
          project: req.params.id
        },
        'Error creating comment. Content is mandatory'
      )
      return sendError(res, 400, 'Comment content is mandatory')
    }

    const userId = req.user.id
    Project.findOne({ _id: req.params.id }).exec(async (err, project) => {
      if (err) {
        log.error(
          {
            err,
            requestId: req.id,
            user: req.user.id,
            project: req.params.id
          },
          'Error finding project in database'
        )
        return sendError(res, 503, 'Error commenting project')
      }

      try {
        const newComment = await createNewComment({
          content: req.body.content,
          mentions: req.body.mentions || [],
          user: userId
        })
        const user = await User.findOne({ _id: userId })
        user.comments.push(newComment._id)
        project.comments.push(newComment._id)
        await project.save()
        await user.save()

        project.populate(
          populateParams,
          async (populateErr, populatedProject) => {
            if (populateErr) {
              log.error(
                {
                  err: populateErr,
                  requestId: req.id,
                  user: req.user.id,
                  project: req.params.id
                },
                'Error populating fields in comment'
              )
              return sendError(res, 403, 'Error adding comment to project')
            }
            log.info(
              {
                requestId: req.id,
                user: req.user.id,
                project: populatedProject,
                comment: newComment
              },
              'Comment added successfully'
            )
            await logProjectComment(req.user.id, populatedProject.id)
            return res.status(200).json({ project: populatedProject })
          }
        )
      } catch (commentErr) {
        log.error(
          {
            err: commentErr,
            requestId: req.id,
            user: req.user.id,
            project: req.params.id
          },
          'Error saving new comment'
        )
        return sendError(res, 503, 'Error adding comment to project')
      }
    })
  }
)

router.put(
  '/:_id/update/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { _id } = req.params
    const userId = req.user.id
    const logData = {
      requestId: req.id,
      user: userId,
      update: _id
    }

    const { text, title } = req.body

    log.info(logData, 'Editing update')

    try {
      await Update.updateOne({ _id }, { $set: { text, title } })
    } catch (e) {
      log.error(logData, 'Error editing update')
      return sendError(res, 503, 'Error Editing the update. Please try again')
    }

    log.info(logData, 'Succesfully Editted update')
    res.send()
  }
)

router.delete(
  '/:updateId/update/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { updateId } = req.params
    const userId = req.user.id
    const logData = {
      requestId: req.id,
      user: userId,
      update: updateId
    }

    log.info(logData, 'Deleting update')

    try {
      await Project.update(
        {},
        { $pull: { updates: { $in: [mongoose.Types.ObjectId(updateId)] } } }
      )
      await Update.findByIdAndDelete({ _id: updateId, owner: userId })
    } catch (e) {
      log.error(logData, 'Error deleting update')
      return sendError(res, 503, 'Error deleting the update. Please try again')
    }

    log.info(logData, 'Update deleted successfully')

    res.send()
  }
)

router.post(
  '/:id/update',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        project: req.params.id
      },
      'User is adds update to project'
    )

    if (!req.body.text) {
      log.warn(
        {
          requestId: req.id,
          user: req.user.id,
          project: req.params.id
        },
        'Error creating update. Text is mandatory'
      )
      return sendError(res, 400, 'Update text is mandatory')
    }
    const userId = req.user.id
    Project.findOne({ _id: req.params.id }).exec(async (err, project) => {
      if (err) {
        log.error(
          {
            err,
            requestId: req.id,
            user: req.user.id,
            project: req.params.id
          },
          'Error finding project in database'
        )
        return sendError(res, 503, 'Error adds update to project')
      }

      try {
        const newUpdate = await createNewUpdate({
          text: req.body.text,
          title: req.body.title,
          owner: userId
        })

        project.updates.push(newUpdate._id)
        await project.save()
        project.populate(
          populateParams,
          async (populateErr, populatedProject) => {
            if (populateErr) {
              log.error(
                {
                  err: populateErr,
                  requestId: req.id,
                  user: req.user.id,
                  project: req.params.id
                },
                'Error populating fields in update'
              )
              return sendError(res, 403, 'Error adding update to project')
            }
            log.info(
              {
                requestId: req.id,
                user: req.user.id,
                project: populatedProject,
                update: newUpdate
              },
              'Update added successfully'
            )
            await logProjectUpdate(req.user.id, populatedProject.id)
            return res.status(200).json({ project: populatedProject })
          }
        )
      } catch (updateErr) {
        log.error(
          {
            err: updateErr,
            requestId: req.id,
            user: req.user.id,
            project: req.params.id
          },
          'Error saving new update'
        )
        return sendError(res, 503, 'Error adding update to project')
      }
    })
  }
)

router.post(
  '/:id/addMembers',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    log.info(
      {
        requestId: req.id,
        project: req.params.id
      },
      'User is adding members to project'
    )

    Project.findOne({ _id: req.params.id }).exec((err, project) => {
      if (err) {
        log.info(
          {
            err,
            requestId: req.id,
            project: req.params.id
          },
          'Error finding project'
        )
        return sendError(res, 503, 'Error adding members project')
      }

      project.team = [...project.team, ...req.body.members]
      project
        .save()
        .then(() => {
          log.info(
            {
              requestId: req.id,
              project: req.params.id
            },
            'Project members added successfully'
          )
          project.populate(populateParams, async (err, project) => {
            if (err) {
              log.err(
                {
                  err,
                  requestId: req.id,
                  project: req.params.id
                },
                'Error populating fields'
              )
              return sendError(res, 503, 'Error adding members to project')
            }
            log.info(
              {
                requestId: req.id,
                project: project
              },
              'Fields populated successfully'
            )
            return res.status(200).json({ project })
          })
        })
        .catch(err => {
          log.error(
            {
              err,
              requestId: req.id,
              project: req.params.id
            },
            'Error saving project'
          )
          return sendError(res, 503, 'Error adding members to project')
        })
    })
  }
)

router.post(
  '/:id/deleteMember',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    log.info(
      {
        requestId: req.id,
        project: req.params.id
      },
      'User is deleting member from project'
    )

    Project.findOne({ _id: req.params.id }).exec((err, project) => {
      if (err) {
        log.info(
          {
            err,
            requestId: req.id,
            project: req.params.id
          },
          'Error finding project'
        )
        return sendError(res, 503, 'Error deleting member from project')
      }

      project.team = project.team.filter(member => member != req.body.memberId)
      project
        .save()
        .then(() => {
          log.info(
            {
              requestId: req.id,
              project: req.params.id
            },
            'Project member deleted successfully'
          )
          project.populate(populateParams, async (err, project) => {
            if (err) {
              log.err(
                {
                  err,
                  requestId: req.id,
                  project: req.params.id
                },
                'Error populating fields'
              )
              return sendError(res, 503, 'Error deleting member from project')
            }
            log.info(
              {
                requestId: req.id,
                project: project
              },
              'Fields populated successfully'
            )
            return res.status(200).json({ project })
          })
        })
        .catch(err => {
          log.error(
            {
              err,
              requestId: req.id,
              project: req.params.id
            },
            'Error saving project'
          )
          return sendError(res, 503, 'Error deleting member from project')
        })
    })
  }
)

router.post(
  '/:id/:type/deleteFile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    log.info(
      {
        requestId: req.id,
        project: req.params.id
      },
      'User is deleting file from project'
    )

    Project.findOne({ _id: req.params.id }).exec((err, project) => {
      if (err) {
        log.info(
          {
            err,
            requestId: req.id,
            project: req.params.id
          },
          'Error finding project'
        )
        return sendError(res, 503, 'Error deleting file from project')
      }
      if (req.params.type === 'video') {
        project.videos = project.videos.filter(
          file => file !== req.body.filePath
        )
      } else if (req.params.type === 'photo') {
        project.photos = project.photos.filter(
          file => file !== req.body.filePath
        )
      } else {
        project.documents = project.documents.filter(
          file => file !== req.body.filePath
        )
      }

      project
        .save()
        .then(() => {
          log.info(
            {
              requestId: req.id,
              project: req.params.id
            },
            'Project file deleted successfully'
          )
          project.populate(populateParams, async (err, project) => {
            if (err) {
              log.err(
                {
                  err,
                  requestId: req.id,
                  project: req.params.id
                },
                'Error populating fields'
              )
              return sendError(res, 503, 'Error deleting file from project')
            }
            log.info(
              {
                requestId: req.id,
                project: project
              },
              'Fields populated successfully'
            )
            return res.status(200).json({ project })
          })
        })
        .catch(err => {
          log.error(
            {
              err,
              requestId: req.id,
              project: req.params.id
            },
            'Error saving project'
          )
          return sendError(res, 503, 'Error deleting file from project')
        })
    })
  }
)
module.exports = router
