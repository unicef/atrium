const express = require('express'),
  router = new express.Router(),
  Project = require('../../models/Project'),
  Comment = require('../../models/Comment'),
  { createNewComment } = require('../../lib/comments'),
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
    path: 'owner',
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

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id
      },
      'Get all projects'
    )

    Project.find()
      .sort({ $natural: -1 })
      .populate(populateParams)
      .exec((err, projects) => {
        if (err) {
          log.error(
            {
              err,
              requestId: req.id,
              user: req.user.id
            },
            'Error getting all projects'
          )
          return sendError(res, 503, 'Error getting projects from the database')
        }

        log.info(
          {
            requestId: req.id,
            user: req.user.id,
            projects
          },
          'Success getting project list'
        )
        return res.status(200).json({ projects })
      })
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

        blockchainName: req.body.blockchainName,
        blockchainType: req.body.blockchainType,
        freeForAll: req.body.freeForAll,
        stageOfProject: req.body.stageOfProject,
        innovationCategory: req.body.innovationCategory,
        thematicArea: req.body.thematicArea,
        contactPersonFullName: req.body.contactPersonFullName,
        contactPersonEmail: req.body.contactPersonEmail,

        websiteLink: req.body.websiteLink,
        tags: req.body.tags ? req.body.tags.split(',') : [],
        linkToDeployedApp: req.body.linkToDeployedApp,
        createdAt: Date.now(),
        linkToRepository: linkToRepository,
        email: req.body.email
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

          log.info(
            {
              requestId: req.id,
              user: req.user.id,
              project: newProject
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
  s3Upload.single('attachment'),
  (req, res) => {
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

    // Updates can be name, details, owner, tags, deployed app link
    const projectData = {
      ...req.body,
      tags: req.body.tags ? req.body.tags.split(',') : [],
      attachment: req.file // How do I relative path?
        ? `https://${req.headers.host}${req.baseUrl}/attachment/${req.file.key}`
        : null
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

    console.log(userId)

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

        project.comments.push(newComment._id)
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

module.exports = router
