const express = require('express'),
  router = new express.Router(),
  Project = require('../../models/Project'),
  Comment = require('../../models/Comment'),
  User = require('../../models/User'),
  Update = require('../../models/Update'),
  Activity = require('../../models/Activity'),
  { createNewComment } = require('../../lib/comments'),
  { createNewUpdate } = require('../../lib/updates'),
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
    logProjectLike
  } = require('../../lib/userActivity')
const mongoose = require('mongoose')
const {
  _notifyDeletedContentByAdmin,
  _actionOnYourContent
} = require('../../lib/nodemailer')
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
      },
      {
        path: 'likes',
        select: userFieldSelection
      }
    ]
  }
]
/**
 * This function creates a query
 * to find one of the values inside of the given string
 * @param {String} values - e.g. "Bitcoin,Stellar,Corda"
 * @returns {Object} - { $regex, $options }
 */
const filterMultipleValues = values => {
  const parsedValues = values.split(',').join('|')
  const regex = '\\b(?:' + parsedValues + ')\\b'

  return { $regex: regex, $options: 'gi' }
}

const handleFilters = queryValues => {
  const filters = []

  if (queryValues.blockchainName) {
    filters.push({
      blockchainName: filterMultipleValues(queryValues.blockchainName)
    })
  }
  if (queryValues.stageOfProject) {
    filters.push({
      stageOfProject: filterMultipleValues(queryValues.stageOfProject)
    })
  }
  if (queryValues.innovationCategory) {
    filters.push({
      innovationCategory: filterMultipleValues(queryValues.innovationCategory)
    })
  }
  if (queryValues.thematicArea) {
    filters.push({
      thematicArea: filterMultipleValues(queryValues.thematicArea)
    })
  }

  return filters
}

const recalcBadges = points => {
  switch (true) {
    case points >= 1000:
      return 7
    case points >= 500:
      return 6
    case points >= 250:
      return 5
    case points >= 100:
      return 4
    case points >= 50:
      return 3
    case points >= 25:
      return 2
    case points >= 10:
      return 1
    default:
      return 0
  }
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

    try {
      const { name } = req.query
      const offset = parseInt(req.query.offset)
      const limit = parseInt(req.query.limit)
      const sort = req.query.sort === 'asc' ? 1 : -1
      const filtersQueries = handleFilters(req.query)

      const searchQuery = []

      if (name) {
        searchQuery.push({
          $or: [
            {
              name: {
                $regex: name,
                $options: 'gi'
              }
            },
            {
              details: {
                $regex: name,
                $options: 'gi'
              }
            }
          ]
        })
      }

      if (filtersQueries.length > 0) {
        searchQuery.push({ $and: filtersQueries })
      }

      const finalQuery = searchQuery.length > 0 ? { $and: searchQuery } : {}

      const projects = await Project.find(finalQuery)
        .skip(offset)
        .limit(limit)
        .sort({ name: sort })
        .populate(populateParams)

      const pageCounter = Math.ceil(projects.length / limit)

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

router.get('/unreg', async (req, res) => {
  log.info(
    {
      requestId: req.id
    },
    'User is getting projects'
  )
  try {
    const { name } = req.query
    const offset = parseInt(req.query.offset)
    const limit = parseInt(req.query.limit)
    const sort = req.query.sort === 'asc' ? 1 : -1
    const filtersQueries = handleFilters(req.query)

    const searchQuery = []

    if (name) {
      searchQuery.push({
        $or: [
          {
            name: {
              $regex: name,
              $options: 'gi'
            }
          },
          {
            details: {
              $regex: name,
              $options: 'gi'
            }
          }
        ]
      })
    }

    if (filtersQueries.length > 0) {
      searchQuery.push({ $and: filtersQueries })
    }

    const finalQuery = searchQuery.length > 0 ? { $and: searchQuery } : {}

    const projects = await Project.find(finalQuery)
      .skip(offset)
      .limit(limit)
      .sort({ name: sort })
      .populate(populateParams)

    const pageCounter = Math.ceil(projects.length / limit)

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
})

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
        attachment: req.file
          ? {
              url: `${req.connection.encrypted ? 'https' : 'http'}://${
                process.env.ATTACHMENT_URL
              }${req.baseUrl}/attachment/${req.file.key}`,
              name: req.file.key,
              extension: req.file.mimetype,
              size: req.file.size
            }
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
        team: [],
        comments: []
      })
      return newProject
        .save()
        .then(async project => {
          const user = await User.findOne({ _id: req.user.id })
          user.projects.push(project)
          if (user.firstProject) {
            user.balance += 50
            const oldBadges = user.badges
            user.badges = recalcBadges(user.balance)
            if (oldBadges < user.badges) {
              for (let i = oldBadges + 1; i <= user.badges; i++) {
                const activity = new Activity({
                  createdAt: project.createdAt,
                  user: user.id,
                  badgeIssued: i,
                  typeOfActivity: 'ISSUE_BADGE'
                })
                await activity.save()
              }
            }
            user.firstProject = false
          }
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
    const user = await User.findById(req.user.id)

    const oldProject = await Project.findOne({ _id: req.params.id })
    // Updates can be name, details, owner, tags, deployed app link
    const projectData = {
      ...req.body,
      tags: req.body.tags ? req.body.tags.split(',') : [],
      attachment:
        req.files && req.files.attachment // How do I relative path?
          ? {
              url: `${req.connection.encrypted ? 'https' : 'http'}://${
                process.env.ATTACHMENT_URL
              }${req.baseUrl}/attachment/${req.files.attachment[0].key}`,
              name: req.files.attachment[0].key,
              extension: req.files.attachment[0].mimetype,
              size: req.files.attachment[0].size
            }
          : null,
      documents:
        req.files && req.files.documents
          ? [
              ...oldProject.documents,
              {
                url: `${req.connection.encrypted ? 'https' : 'http'}://${
                  process.env.ATTACHMENT_URL
                }${req.baseUrl}/attachment/${req.files.documents[0].key}`,
                name: req.files.documents[0].key,
                extension: req.files.documents[0].mimetype,
                size: req.files.documents[0].size
              }
            ]
          : [...oldProject.documents],
      videos:
        req.files && req.files.videos
          ? [
              ...oldProject.videos,
              {
                url: `${req.connection.encrypted ? 'https' : 'http'}://${
                  process.env.ATTACHMENT_URL
                }${req.baseUrl}/attachment/${req.files.videos[0].key}`,
                name: req.files.videos[0].key,
                extension: req.files.videos[0].mimetype,
                size: req.files.videos[0].size
              }
            ]
          : [...oldProject.videos],
      photos:
        req.files && req.files.photos
          ? [
              ...oldProject.photos,
              {
                url: `${req.connection.encrypted ? 'https' : 'http'}://${
                  process.env.ATTACHMENT_URL
                }${req.baseUrl}/attachment/${req.files.photos[0].key}`,
                name: req.files.photos[0].key,
                extension: req.files.photos[0].mimetype,
                size: req.files.photos[0].size
              }
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
      async (err, project) => {
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
        const owner = await User.findById(project.owner)
        if (owner.updatesOnProject) {
          await _actionOnYourContent(
            owner.email,
            'Content',
            'updated',
            'project',
            user.email,
            'updated your project'
          )
        }
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
      try {
        const owner = await User.findOne({
          _id: req.user.id
        })
        owner.projects.pop(owner.projects.indexOf(req.params.id))
        await owner.save()
        log.info(
          {
            requestId: req.id,
            user: req.user.id,
            project: req.params.id
          },
          'Project deleted successfully'
        )
        if (req.user.isAdmin) {
          _notifyDeletedContentByAdmin(owner.email, 'Project', response.name)
        }
        res.json({ message: 'Project deleted successfully' })
      } catch (error) {
        log.error(
          {
            error,
            requestId: req.id,
            user: req.user.id,
            project: req.params.id
          },
          'Error find project owner'
        )
        return sendError(res, 503, 'Error find project owner. Please try again')
      }
    })
  }
)

router.post(
  '/:projectId/transferOwnership',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        project: req.params.projectId
      },
      'User is transfering project ownership'
    )
    try {
      const project = await Project.findOne({
        _id: req.params.projectId
      }).populate(populateParams)
      const owner = await User.findOne({
        _id: req.user.id
      })
      const newOwner = await User.findOne({
        _id: req.body.userToTransfer
      })
      owner.projects.pop(owner.projects.indexOf(project._id))
      newOwner.projects.push(project._id)
      await owner.save()
      await newOwner.save()
      project.owner = newOwner
      project.projectOwner = newOwner.name
      project.projectOwnerEmail = newOwner.email
      await project.save()
      log.info(
        {
          requestId: req.id
        },
        'Success transfering ownership'
      )
      return res.status(200).json({ project })
    } catch (error) {
      log.info(
        {
          requestId: req.id,
          error: error
        },
        'Can not get project from the database'
      )
      return sendError(res, 503, 'Error getting project from the database')
    }
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
    Project.findOne({ _id: req.params.id }).exec(async (err, project) => {
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
      const user = await User.findById(req.user.id)

      if (!isLiked) {
        likes = [...likes, userId]
        project.team.map(async member => {
          const user = await User.findById(member)
          user.balance += 1
          const oldBadges = user.badges
          user.badges = recalcBadges(user.balance)
          if (oldBadges < user.badges) {
            const activity = new Activity({
              createdAt: project.createdAt,
              user: user.id,
              badgeIssued: user.badges,
              typeOfActivity: 'ISSUE_BADGE'
            })
            await activity.save()
          }
          await user.save()
        })
        const user = await User.findById(project.owner)
        user.balance += 5
        const oldBadges = user.badges
        user.badges = recalcBadges(user.balance)
        if (oldBadges < user.badges) {
          const activity = new Activity({
            createdAt: project.createdAt,
            user: user.id,
            badgeIssued: user.badges,
            typeOfActivity: 'ISSUE_BADGE'
          })
          await activity.save()
        }
        await user.save()
      }
      project.likes = likes
      project
        .save()
        .then(async () => {
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
            const owner = await User.findById(project.owner)
            if (owner.updatesOnProject) {
              await _actionOnYourContent(
                owner.email,
                'Like',
                'added',
                'project',
                user.email,
                'liked your project'
              )
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

    const comment = await Comment.findById(_id)
    log.info(logData, 'Editing comment')

    try {
      await Comment.updateOne({ _id }, { $set: { content } })
    } catch (e) {
      log.error(logData, 'Error editing comment')
      return sendError(res, 503, 'Error Editing the comment. Please try again')
    }
    const user = await User.findById(userId)
    const owner = await User.findById(comment.user)
    if (owner.commentOnProject) {
      await _actionOnYourContent(
        owner.email,
        '',
        'editted',
        'comment',
        user.email,
        'edited your comment'
      )
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
      const comment = await Comment.findByIdAndDelete({
        _id: commentId,
        user: userId
      })
      const user = await User.findById(userId)

      const owner = await User.findById(comment.user)
      if (owner.updatesOnProject) {
        await _actionOnYourContent(
          owner.email,
          '',
          'deleted',
          'comment',
          user.email,
          'deleted comment on your project'
        )
      }

      if (req.user.isAdmin) {
        _notifyDeletedContentByAdmin(owner.email, 'Comment', comment.content)
      }
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
          replies: [],
          likes: [],
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
            const owner = await User.findById(populatedProject.owner)
            if (owner.updatesOnProject) {
              await _actionOnYourContent(
                owner.email,
                'Comment',
                'added',
                'project',
                user.email,
                'commented your project'
              )
            }
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

router.get(
  '/:projectId/comments',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        project: req.params.projectId
      },
      'User is getting project comments'
    )
    try {
      const project = await Project.findOne({
        _id: req.params.projectId
      }).populate(populateParams)
      let { comments } = project
      if (req.query.sort === 'asc') {
        comments = comments.sort((a, b) =>
          a.likes.length > b.likes.length
            ? 1
            : b.likes.length > a.likes.length
            ? -1
            : 0
        )
      } else {
        comments = comments.sort((a, b) =>
          a.likes.length < b.likes.length
            ? 1
            : b.likes.length < a.likes.length
            ? -1
            : 0
        )
      }
      const pageCounter = Math.ceil(comments.length / req.query.limit)
      comments = comments.splice(req.query.offset, req.query.limit)
      log.info(
        {
          requestId: req.id,
          comments,
          pageCounter
        },
        'Success getting comments list'
      )
      return res.status(200).json({ comments, pageCounter })
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

router.put(
  '/:_id/update',
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
    const update = await Update.findById(_id)
    const user = await User.findById(userId)
    const owner = await User.findById(update.owner)
    if (owner.updatesOnProject) {
      await _actionOnYourContent(
        owner.email,
        'Update',
        'edited',
        'project',
        user.email,
        'edited update in your project'
      )
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
      const update = await Update.findByIdAndDelete({
        _id: updateId
      })
      const user = await User.findById(userId)
      const owner = await User.findById(update.owner)
      if (owner.updatesOnProject) {
        await _actionOnYourContent(
          owner.email,
          'Update',
          'deleted',
          'project',
          user.email,
          'deleted update from your project'
        )
      }
      if (req.user.isAdmin) {
        _notifyDeletedContentByAdmin(owner.email, 'Update', update.title)
      }
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
            const user = await User.findById(userId)
            const owner = await User.findById(populatedProject.owner)
            if (owner.updatesOnProject) {
              await _actionOnYourContent(
                owner.email,
                'Update',
                'added',
                'project',
                user.email,
                'added update to your project'
              )
            }
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
      req.body.members.map(async member => {
        const user = await User.findById(member)
        user.balance += 15
        const oldBadges = user.badges
        user.badges = recalcBadges(user.balance)
        if (oldBadges < user.badges) {
          const activity = new Activity({
            createdAt: project.createdAt,
            user: user.id,
            badgeIssued: user.badges,
            typeOfActivity: 'ISSUE_BADGE'
          })
          await activity.save()
        }
        await user.save()
      })
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
          file => file.url !== req.body.filePath.url
        )
      } else if (req.params.type === 'photo') {
        project.photos = project.photos.filter(
          file => file.url !== req.body.filePath.url
        )
      } else {
        project.documents = project.documents.filter(
          file => file.url !== req.body.filePath.url
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

router.post(
  '/:projectId/report',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        project: req.params.projectId
      },
      'User is reporting project'
    )
    if (req.body.reported === true && !req.body.reportMessage) {
      log.warn(
        {
          requestId: req.id,
          user: req.user.id,
          project: req.params.projectId
        },
        'Error reporting project. Report message is mandatory'
      )
      return sendError(res, 400, 'Project report message is mandatory')
    }

    try {
      const project = await Project.findOneAndUpdate(
        { _id: req.params.projectId },
        {
          reported: !!req.body.reported,
          reportMessage: req.body.reportMessage
        },
        { new: true }
      ).populate(populateParams)

      if (project === null) throw 'Project not found.'

      log.info(
        {
          requestId: req.id,
          project
        },
        'Success reporting project'
      )
      return res.status(200).json({ project })
    } catch (error) {
      log.info(
        {
          requestId: req.id,
          error: error
        },
        'Can not report project from the database'
      )
      return sendError(res, 503, 'Error reporting project from the database')
    }
  }
)

router.post(
  '/:updateId/update/report',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        update: req.params.updateId
      },
      'User is reporting update'
    )
    if (req.body.reported === true && !req.body.reportMessage) {
      log.warn(
        {
          requestId: req.id,
          user: req.user.id,
          updateId: req.params.updateId
        },
        'Error reporting update. Report message is mandatory'
      )
      return sendError(res, 400, 'Update report message is mandatory')
    }

    try {
      const update = await Update.findOneAndUpdate(
        { _id: req.params.updateId },
        {
          reported: !!req.body.reported,
          reportMessage: req.body.reportMessage
        },
        { new: true }
      ).populate(populateParams)

      if (update === null) throw 'Update not found.'

      log.info(
        {
          requestId: req.id,
          update
        },
        'Success reporting update'
      )
      return res.status(200).json({ update })
    } catch (error) {
      log.info(
        {
          requestId: req.id,
          error: error
        },
        'Can not report update from the database'
      )
      return sendError(res, 503, 'Error reporting update from the database')
    }
  }
)

router.post(
  '/:commentId/comment/report',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        comment: req.params.commentId
      },
      'User is reporting comment'
    )
    if (req.body.reported === true && !req.body.reportMessage) {
      log.warn(
        {
          requestId: req.id,
          user: req.user.id,
          comment: req.params.commentId
        },
        'Error reporting comment. Report message is mandatory'
      )
      return sendError(res, 400, 'Comment report message is mandatory')
    }

    try {
      const comment = await Comment.findOneAndUpdate(
        { _id: req.params.commentId },
        {
          reported: !!req.body.reported,
          reportMessage: req.body.reportMessage
        },
        { new: true }
      ).populate(populateParams)

      log.info(
        {
          requestId: req.id,
          comment
        },
        'Success reporting comment'
      )
      return res.status(200).json({ comment })
    } catch (error) {
      log.info(
        {
          requestId: req.id,
          error: error
        },
        'Can not report comment from the database'
      )
      return sendError(res, 503, 'Error getting reporting from the database')
    }
  }
)

module.exports = router
