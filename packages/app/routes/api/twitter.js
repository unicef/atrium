const express = require('express')
const _ = require('lodash')
const passport = require('passport')
const router = express.Router()
// Custom GitHub library:
const log = require('../../config/log')
const twitterLibrary = require('../../lib/twitter')
// Importing user to update the user model
const User = require('../../models/User')
const { sendError } = require('../../lib/requestUtils')

// @route GET api/twitter/
// @desc Get a few tweets from unin twitter page
// @access Public

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id
      },
      'Getting tweets'
    )

    twitterLibrary
      .readFromTwitter('un_innovation')
      .then(response => {
        log.info(
          {
            requestId: req.id,
            user: req.user.id
          },
          'Tweets retrieved successfully'
        )
        if (response.length > 0) {
          const tweetsForClient = []
          response.forEach(element => {
            var subset = _.pick(element, [
              'created_at',
              'full_text',
              'retweet_count',
              'favorite_count'
            ])
            tweetsForClient.push(subset)
          })

          log.info(
            {
              requestId: req.id,
              user: req.user.id,
              tweets: tweetsForClient
            },
            'Tweets found'
          )

          res.send({
            tweetsForClient
          })
        } else {
          log.info(
            {
              requestId: req.id,
              user: req.user.id
            },
            'No tweets found'
          )
          res.send({
            tweetsForClient: []
          })
        }
      })
      .catch(err => {
        log.error(
          {
            err,
            requestId: req.id,
            user: req.user.id
          },
          'Error getting tweets'
        )
        return sendError(
          res,
          424,
          'Error accessing the Twitter API to read tweets'
        )
      })
  }
)

// @route POST api/twitter/add
// @desc Have unin twitter follow an account
// @access Public
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        tweet: req.body
      },
      'Follow account'
    )

    twitterLibrary
      .followOnTwitter(req.body.twitterHandle)
      .then(response => {
        log.info(
          {
            requestId: req.id,
            user: req.user.id,
            twitterHandle: req.body.twitterHandle
          },
          'Twitter account followed successfully'
        )

        const query = { name: req.body.name }
        User.findOneAndUpdate(
          query,
          {
            twitterHandle: req.body.twitterHandle
          },
          {
            new: true
          }
        )
          .then(updatedUser => {
            log.info(
              {
                requestId: req.id,
                user: req.user.id,
                twitterHandle: req.body.twitterHandle
              },
              'User updated successfully'
            )
            res.send(updatedUser)
          })
          .catch(err => {
            log.error(
              {
                err,
                requestId: req.id,
                user: req.user.id,
                twitterHandle: req.body.twitterHandle
              },
              'Error updating user in database'
            )
            return sendError(
              res,
              503,
              'Error updating the user with the Twitter handle'
            )
          })
      })
      .catch(err => {
        log.error(
          {
            err,
            requestId: req.id,
            user: req.user.id
          },
          'Error following account'
        )
        return sendError(
          res,
          424,
          'Error accessing the Twitter API to follow Twitter account'
        )
      })
  }
)

module.exports = router
