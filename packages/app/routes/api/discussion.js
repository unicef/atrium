const express = require('express')
const passport = require('passport')
const router = new express.Router()
const Discussion = require('../../models/Discussion')
const Comment = require('../../models/Comment')
const xorWith = require('lodash/xorWith')
const validationMiddleware = require('../../lib/validationMiddleware')
const badgesLibrary = require('../../lib/badges')
const log = require('../../config/log')
const discussionSchemas = require('../../validation/discussion')
const {
  logCreateDiscussion,
  logParticipateInDiscussion,
  logLikeDiscussion,
  logIssueBadge
} = require('../../lib/userActivity')
const {
  sendError,
  getAuthenticatedRequestLogDetails
} = require('../../lib/requestUtils')
const { BADGE_ENUM } = require('../../config/unin-constants')

const userFieldSelection = 'name email avatar'
const populateParams = [
  {
    path: 'likes',
    select: userFieldSelection
  },
  {
    path: 'user',
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

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validationMiddleware(discussionSchemas.createDiscussion),
  async (req, res) => {
    log.info(
      getAuthenticatedRequestLogDetails(req, { discussion: req.body }),
      'Creating a discussion'
    )

    const newDiscussion = new Discussion({
      title: req.body.title,
      content: req.body.content,
      user: req.user.id,
      createdAt: Date.now(),
      comments: [],
      likes: [],
      type: req.body.type
    })

    try {
      const savedDiscussion = await (await newDiscussion.save())
        .populate(populateParams)
        .execPopulate()
      log.info(
        getAuthenticatedRequestLogDetails(req, { discussion: newDiscussion }),
        'Discussion saved successfully'
      )

      if (
        !(await badgesLibrary.hasBadge(BADGE_ENUM.INFLUENCER, req.user.address))
      ) {
        await badgesLibrary.issueBadge(BADGE_ENUM.INFLUENCER, req.user.address)
        await logIssueBadge(req.user.id, BADGE_ENUM.INFLUENCER)
      }
      await logCreateDiscussion(req.user.id, savedDiscussion.id)
      return res.json({ discussion: savedDiscussion })
    } catch (err) {
      log.error(
        getAuthenticatedRequestLogDetails(req, { err, discussion: req.body }),
        'Error saving discussion'
      )

      return sendError(res, 503, 'Error saving discussion')
    }
  }
)

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      getAuthenticatedRequestLogDetails(req, { discussion: req.body }),
      'Editting a discussion'
    )

    const { id } = req.params
    const { title, type, content } = req.body
    console.log(req.body)
    try {
      await Discussion.findOneAndUpdate(
        { _id: id },
        { $set: { title, type, content } },
        {
          useFindAndModify: false
        }
      )
    } catch (e) {
      console.log(e)
      log.info(
        getAuthenticatedRequestLogDetails(req, {
          discussion: req.params.discussionId
        }),
        'Failed to edit discussion'
      )
      return sendError(res, 503, 'Error editting discussion')
    }
    res.json({ success: true })
  }
)

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      getAuthenticatedRequestLogDetails(req, { discussion: req.body }),
      'Deleting a discussion'
    )

    const { id } = req.params
    try {
      await Discussion.deleteOne({ _id: id })
    } catch (e) {
      log.info(
        getAuthenticatedRequestLogDetails(req, {
          discussion: req.params.discussionId
        }),
        'Failed to delete discussion'
      )
      return sendError(res, 503, 'Error deleting discussion')
    }
    res.json({ success: true })
  }
)

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(getAuthenticatedRequestLogDetails(req), 'Getting all discussions')
    try {
      const discussionList = await Discussion.find()
        .sort({ $natural: -1 })
        .populate(populateParams)
        .exec()
      log.info(
        getAuthenticatedRequestLogDetails(req, { discussionList }),
        'Discussion list retrieved successfully'
      )

      return res.json({ discussions: discussionList })
    } catch (err) {
      log.error(
        getAuthenticatedRequestLogDetails(req, { err }),
        'Error retrieving discussion list'
      )

      return sendError(res, 503, 'Error retrieving discussion list')
    }
  }
)

router.get(
  '/:discussionId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      getAuthenticatedRequestLogDetails(req, {
        discussion: req.params.discussionId
      }),
      'Getting discussion ID'
    )

    try {
      const discussion = await Discussion.findById(req.params.discussionId)
        .populate(populateParams)
        .exec()
      log.info(
        getAuthenticatedRequestLogDetails(req, {
          discussion: req.params.discussionId
        })
      )

      return res.json({ discussion })
    } catch (err) {
      log.error(
        getAuthenticatedRequestLogDetails(req, {
          discussion: req.params.discussionId
        })
      )
      return sendError(res, 503, 'Error getting discussion details')
    }
  }
)

router.post(
  '/:discussionId/comment',
  passport.authenticate('jwt', { session: false }),
  validationMiddleware(discussionSchemas.commentDiscussion),
  async (req, res) => {
    log.info(
      getAuthenticatedRequestLogDetails(req, {
        discussion: req.params.discussionId,
        comment: req.body
      }),
      'Adding comment to discussion'
    )

    const userId = req.user.id

    try {
      const newComment = new Comment({
        content: req.body.content,
        user: userId,
        date: Date.now()
      })

      const savedComment = await newComment.save()

      log.info(
        getAuthenticatedRequestLogDetails(req, {
          discussion: req.params.discussionId,
          comment: savedComment
        }),
        'Comment created successfully'
      )

      const updatedDiscussion = await Discussion.findOneAndUpdate(
        {
          _id: req.params.discussionId
        },
        {
          $push: {
            comments: savedComment.id
          }
        },
        {
          new: true
        }
      )
        .populate(populateParams)
        .exec()

      log.info(
        getAuthenticatedRequestLogDetails(req, {
          discussion: updatedDiscussion
        }),
        'Discussion updated successfully'
      )

      if (
        !(await badgesLibrary.hasBadge(BADGE_ENUM.INFLUENCER, req.user.address))
      ) {
        await badgesLibrary.issueBadge(BADGE_ENUM.INFLUENCER, req.user.address)
        await logIssueBadge(req.user.id, BADGE_ENUM.INFLUENCER)
      }
      await logParticipateInDiscussion(req.user.id, updatedDiscussion.id)

      return res.json({ discussion: updatedDiscussion })
    } catch (err) {
      log.error(
        getAuthenticatedRequestLogDetails(req, { err }),
        'Error adding comment to discussion'
      )
      return sendError(res, 503, 'Error adding comment to discussion')
    }
  }
)

router.patch(
  '/:discussionId/like',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      getAuthenticatedRequestLogDetails(
        req,
        { discussion: req.params.discussionId },
        'Toggling like in project'
      )
    )

    try {
      const currentDiscussion = await Discussion.findById(
        req.params.discussionId
      ).exec()

      const newLikes = xorWith(
        currentDiscussion.likes,
        [req.user.id],
        (el1, el2) => el1 + '' === el2 + ''
      )
      const isLiked = newLikes.length < currentDiscussion.likes.length
      const updatedDiscussion = await Discussion.findOneAndUpdate(
        { _id: req.params.discussionId },
        {
          likes: newLikes
        },
        { new: true }
      )
        .populate(populateParams)
        .exec()

      log.info(
        getAuthenticatedRequestLogDetails(req, {
          discussion: updatedDiscussion
        }),
        'Discussion updated successfully'
      )

      if (!isLiked) {
        await logLikeDiscussion(req.user.id, updatedDiscussion.id)
      }

      return res.json({ discussion: updatedDiscussion })
    } catch (err) {
      log.error(getAuthenticatedRequestLogDetails(req, { err }))
      return sendError(res, 503, 'Error toggling like')
    }
  }
)

module.exports = router
