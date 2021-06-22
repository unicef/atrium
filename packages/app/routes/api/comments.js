const express = require('express'),
  router = new express.Router(),
  Comment = require('../../models/Comment'),
  User = require('../../models/User'),
  { createNewComment } = require('../../lib/comments'),
  passport = require('passport'),
  log = require('../../config/log'),
  { sendError } = require('../../lib/requestUtils'),
  { logProjectComment } = require('../../lib/userActivity')
const userFieldSelection = 'name email avatar company' // select only name and email from users
const populateParams = [
  {
    path: 'user',
    select: userFieldSelection
  },
  {
    path: 'mentions',
    select: userFieldSelection
  },
  {
    path: 'replies',
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
        path: 'replies'
      },
      {
        path: 'likes',
        select: userFieldSelection
      }
    ]
  },
  {
    path: 'likes',
    select: userFieldSelection
  }
]
const { _actionOnYourContent } = require('../../lib/nodemailer')

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
  '/:commentId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        comment: req.params.commentId
      },
      'User is getting comment replies'
    )
    try {
      const comment = await Comment.findOne({
        _id: req.params.commentId
      }).populate(populateParams)
      const { replies } = comment

      log.info(
        {
          requestId: req.id,
          replies
        },
        'Success getting replies list'
      )
      return res.status(200).json({ replies })
    } catch (error) {
      log.info(
        {
          requestId: req.id,
          error: error
        },
        'Can not get replies from the database'
      )
      return sendError(res, 503, 'Error getting replies from the database')
    }
  }
)

router.post(
  '/:commentId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        comment: req.params.commentId
      },
      'User is replying to comment'
    )

    if (!req.body.content) {
      log.warn(
        {
          requestId: req.id,
          user: req.user.id,
          comment: req.params.commentId
        },
        'Error creating reply. Content is mandatory'
      )
      return sendError(res, 400, 'Reply content is mandatory')
    }

    const userId = req.user.id
    Comment.findOne({ _id: req.params.commentId }).exec(
      async (err, comment) => {
        if (err) {
          log.error(
            {
              err,
              requestId: req.id,
              user: req.user.id,
              comment: req.params.commentId
            },
            'Error finding comment in database'
          )
          return sendError(res, 503, 'Error replying to comment')
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
          comment.replies.push(newComment._id)
          await comment.save()
          await user.save()

          comment.populate(
            populateParams,
            async (populateErr, populatedComment) => {
              if (populateErr) {
                log.error(
                  {
                    err: populateErr,
                    requestId: req.id,
                    user: req.user.id,
                    comment: req.params.commentId
                  },
                  'Error populating fields in comment'
                )
                return sendError(res, 403, 'Error adding reply to comment')
              }
              log.info(
                {
                  requestId: req.id,
                  user: req.user.id,
                  comment: populatedComment,
                  reply: newComment
                },
                'Reply added successfully'
              )
              await logProjectComment(req.user.id, populatedComment.id)
              _actionOnYourContent(populatedComment.user.email, 'reply', 'added', 'comment', user.email, 'replied to your comment')
              return res.status(200).json({ comment: populatedComment })
            }
          )
        } catch (commentErr) {
          log.error(
            {
              err: commentErr,
              requestId: req.id,
              user: req.user.id,
              comment: req.params.commentId
            },
            'Error saving new reply'
          )
          return sendError(res, 503, 'Error adding reply to comment')
        }
      }
    )
  }
)

router.get(
  '/:commentId/like',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        comment: req.params.commentId
      },
      'User is liking a comment'
    )

    const userId = req.user.id
    Comment.findOne({ _id: req.params.commentId }).exec(
      async (err, comment) => {
        if (err) {
          log.error(
            {
              err,
              requestId: req.id,
              user: req.user.id,
              comment: req.params.commentId
            },
            'Error finding comment in database'
          )
          return sendError(res, 503, 'Error replying to comment')
        }

        try {
          const index = comment.likes.indexOf(userId)
          const user = await User.findById(userId)

          if (index > -1) comment.likes.splice(index, 1)
          else {
            const owner = await User.findById(comment.user)
            comment.likes.push(userId)
            owner.balance += 2
            owner.badges = recalcBadges(owner.balance)
            await owner.save()
          }
          await comment.save()
          comment.populate(
            populateParams,
            async (populateErr, populatedComment) => {
              if (populateErr) {
                log.error(
                  {
                    err: populateErr,
                    requestId: req.id,
                    user: req.user.id,
                    comment: req.params.commentId
                  },
                  'Error populating fields in comment'
                )
                return sendError(res, 403, 'Error adding reply to comment')
              }
              log.info(
                {
                  requestId: req.id,
                  user: req.user.id,
                  comment: populatedComment
                },
                'Like added successfully'
              )
              await logProjectComment(req.user.id, populatedComment.id)
              _actionOnYourContent(populatedComment.user.email, 'like', 'added', 'comment', user.email, 'liked your comment')
              return res.status(200).json({ comment: populatedComment })
            }
          )
        } catch (commentErr) {
          log.error(
            {
              err: commentErr,
              requestId: req.id,
              user: req.user.id,
              comment: req.params.commentId
            },
            'Error saving comment'
          )
          return sendError(res, 503, 'Error liking comment')
        }
      }
    )
  }
)

module.exports = router
