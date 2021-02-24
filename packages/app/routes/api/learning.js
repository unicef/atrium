const express = require('express')
const passport = require('passport')
const router = new express.Router()
const LearningResource = require('../../models/LearningResource')
const _ = require('lodash')
const log = require('../../config/log')
const { sendError } = require('../../lib/requestUtils')
const Comment = require('../../models/Comment')
const {
  logLearningResourceUpload,
  logLearningResourceLike,
  logLearningResourceComment
} = require('../../lib/userActivity')

const userFieldSelection = 'name email'
const populateParams = [
  {
    path: 'likes',
    select: userFieldSelection
  },
  {
    path: 'uploader',
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
      'Getting all learning resources'
    )

    LearningResource.find()
      .populate(populateParams)
      .exec((err, learningResources) => {
        if (err) {
          log.error(
            {
              requestId: req.id,
              user: req.user.id
            },
            'Error getting learning resources'
          )
          return sendError(res, 503, 'Error finding learning resources')
        }
        log.info(
          {
            requestId: req.id,
            user: req.user.id,
            learningResources
          },
          'Success getting learning resources'
        )
        res.json(learningResources)
      })
  }
)

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        learningResource: req.body
      },
      'Trying to create learning resource'
    )

    try {
      const existingLearningResource = await LearningResource.findOne({
        link: req.body.link
      })
      if (existingLearningResource) {
        log.info(
          {
            requestId: req.id,
            user: req.user.id,
            existingLearningResource
          },
          'Learning resource with same link already exisits'
        )
        return sendError(
          res,
          409,
          'A learning resource with the same link already exists'
        )
      }
    } catch (err) {
      return sendError(res, 503, 'Error querying database')
    }

    const newLearningResource = new LearningResource({
      title: req.body.title,
      description: req.body.description,
      link: req.body.link,
      category: req.body.category,
      uploader: req.user.id
    })

    newLearningResource
      .save()
      .then(resource => {
        resource
          .populate(populateParams)
          .execPopulate()
          .then(async () => {
            log.info(
              {
                requestId: req.id,
                user: req.user.id,
                learningResource: resource
              },
              'Success creating learning resource'
            )

            await logLearningResourceUpload(req.user.id, resource.id)

            res.status(200).json({ resource })
          })
          .catch(err => {
            log.error(
              {
                requestId: req.id,
                user: req.user.id,
                err
              },
              'Error creating new learning resource'
            )
            return sendError(res, 503, 'Error creating new learning resource')
          })
      })
      .catch(err => {
        log.error(
          {
            requestId: req.id,
            user: req.user.id,
            err
          },
          'Error creating new learning resource'
        )
        return sendError(res, 503, 'Error saving new learning resource')
      })
  }
)

router.patch(
  '/:id/like',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const userId = req.user.id
    const resourceId = req.params.id

    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        resourceId: req.params.id
      },
      'Liking learning resource'
    )
    try {
      LearningResource.findById(resourceId, (err, resource) => {
        if (err) {
          log.error(
            {
              requestId: req.id,
              user: req.user.id,
              err
            },
            'Error finding learning resource'
          )
          return sendError(res, 503, 'Error updating learning resource')
        }
        const newLikes = _.xorWith(
          resource.likes,
          [userId],
          (el1, el2) => el1 + '' === el2 + ''
        )
        const isLiked = newLikes.length < resource.likes.length
        LearningResource.findByIdAndUpdate(
          {
            _id: resourceId
          },
          {
            likes: newLikes
          },
          { new: true },
          (updateError, updatedResource) => {
            if (updateError) {
              log.error(
                {
                  requestId: req.id,
                  user: req.user.id,
                  err: updateError
                },
                'Error updating learning resource'
              )
              return sendError(res, 503, 'Error updating learning resource')
            }

            updatedResource
              .populate(populateParams)
              .execPopulate()
              .then(async populatedUpdatedResource => {
                if (!isLiked) {
                  await logLearningResourceLike(
                    req.user.id,
                    populatedUpdatedResource.id
                  )
                }

                res.json({ resource: populatedUpdatedResource })
              })
              .catch(error => {
                log.error(
                  {
                    requestId: req.id,
                    user: req.user.id,
                    err: error
                  },
                  'Error populating updated resource'
                )
                return sendError(res, 503, 'Error populating learning resource')
              })
          }
        )
      })
    } catch (err) {
      log.error(
        {
          requestId: req.id,
          user: req.user.id,
          err
        },
        'Error updating learning resource'
      )
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
        resourceId: req.params.id
      },
      'Get learning resource'
    )
    const resourceId = req.params.id
    LearningResource.findById(resourceId)
      .populate(populateParams)
      .exec((err, resource) => {
        if (err) {
          log.error(
            {
              requestId: req.id,
              user: req.user.id,
              resourceId,
              err
            },
            'Error getting resource'
          )
          return sendError(res, 503, 'Error getting learning resource')
        }
        log.info(
          {
            requestId: req.id,
            user: req.user.id,
            resource
          },
          'Success getting learning resource'
        )
        return res.json({ resource })
      })
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
        resourceId: req.params.id,
        comment: req.body
      },
      'Adding comment to learning resource'
    )

    if (!req.body.content) {
      log.info(
        {
          requestId: req.id,
          user: req.user.id,
          resourceId: req.params.id,
          comment: req.body
        },
        'Error: Comment content is mandatory'
      )
      return sendError(res, 400, 'Comment content is mandatory')
    }

    const userId = req.user.id
    LearningResource.findOne({ _id: req.params.id }).exec(
      async (err, resource) => {
        if (err) {
          log.error(
            {
              requestId: req.id,
              user: req.user.id,
              err
            },
            'Error adding comment to learning resource'
          )
          return sendError(res, 503, 'Error commenting learning resource')
        }

        const comment = new Comment({
          content: req.body.content,
          user: userId,
          date: Date.now()
        })

        try {
          const newComment = await comment.save()
          resource.comments.push(newComment._id)
          await resource.save()

          resource.populate(
            populateParams,
            async (populateError, savedResource) => {
              if (populateError) {
                log.error(
                  {
                    requestId: req.id,
                    user: req.user.id,
                    resource: savedResource
                  },
                  'Error populating resource'
                )
                return sendError(
                  res,
                  503,
                  'Error adding comment to learning resource'
                )
              }
              log.info(
                {
                  requestId: req.id,
                  user: req.user.id,
                  resource: savedResource
                },
                'Success adding comment'
              )

              await logLearningResourceComment(req.user.id, savedResource.id)
              return res.status(200).json({ resource: savedResource })
            }
          )
        } catch (savingErr) {
          log.error(
            {
              requestId: req.id,
              user: req.user.id,
              resourceId: req.params.id
            },
            'Error saving comment'
          )
          return sendError(
            res,
            503,
            'Error adding comment to learning resource'
          )
        }
      }
    )
  }
)

module.exports = router
