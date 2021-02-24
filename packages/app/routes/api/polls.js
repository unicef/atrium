const express = require('express')
const passport = require('passport')
const router = express.Router()
const Poll = require('../../models/Poll')
const keys = require('../../config/keys')
const badgesLibrary = require('../../lib/badges')
const twitterLibrary = require('../../lib/twitter')
const log = require('../../config/log')
const decisionsLibrary = require('../../lib/decisions')
const { sendError } = require('../../lib/requestUtils')
const { BADGE_ENUM } = require('../../config/unin-constants')
const { logIssueBadge } = require('../../lib/userActivity')

// Should create a new poll in the db
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        poll: req.body
      },
      'Creating a poll'
    )
    // will need to validate the input that is coming in
    // from the front end (topic and choices)
    if (!req.body.topic) {
      log.warn(
        { requestId: req.id, user: req.user.id },
        'Error creating poll. Required topic not found'
      )
      return sendError(res, 400, 'Please provide a topic to vote on')
    }

    if (!req.body.choices) {
      log.warn(
        { requestId: req.id, user: req.user.id },
        'Error creating poll. Required choices not found'
      )
      return sendError(res, 400, 'Please provide choices to vote with')
    }

    const newPoll = new Poll({
      topic: req.body.topic,
      choices: req.body.choices
    })

    newPoll
      .save()
      .then(poll => {
        log.info(
          {
            requestId: req.id,
            user: req.user.id,
            poll
          },
          'Poll created successfully'
        )
        res.json(poll)
      })
      .catch(err => {
        log.error(
          {
            err,
            requestId: req.id,
            user: req.user.id,
            poll: req.body
          },
          'Error saving new poll'
        )
      })
  }
)

// Should get all of the polls that are in the db
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Works
    log.info(
      {
        requestId: req.id,
        user: req.user.id
      },
      'Getting all open polls'
    )

    Poll.find({
      $and: [{ expiryTime: { $gt: Date.now() } }, { completed: false }]
    })
      .sort({ $natural: -1 })
      .exec((err, polls) => {
        if (err) {
          log.error(
            {
              err,
              requestId: req.id,
              user: req.user.id
            },
            'Error getting polls'
          )
          return sendError(res, 503, 'Error getting polls from db', err)
        }
        log.info(
          {
            requestId: req.id,
            user: req.user.id,
            polls
          },
          'Open polls retrieved successfully'
        )
        return res.status(200).json({
          polls
        })
      })
  }
)

router.post(
  '/:pollId/vote',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const user = req.body.user
    const choice = req.body.choice
    const address = req.body.address

    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        poll: req.params.pollId,
        vote: req.body
      },
      'Casting vote in poll'
    )

    Poll.updateOne(
      {
        _id: req.params.pollId,
        'choices.value': choice
      },
      {
        $push: {
          voters: user
        },
        $inc: {
          'choices.$.votes': 1
        }
      },
      { upsert: true },
      async (err, data) => {
        if (err) {
          log.error(
            {
              err,
              requestId: req.id,
              user: req.user.id,
              poll: req.params.pollId
            },
            'Error casting vote in poll'
          )
          return sendError(res, 503, 'Error getting polls from db', err)
        }
        log.info(
          {
            requestId: req.id,
            user: req.user.id,
            poll: data
          },
          'Vote cast successfully'
        )

        // Need to issue badge 3 here:
        if (address) {
          log.info(
            {
              requestId: req.id,
              user: req.user.id
            },
            'Issuing Influencer badge'
          )
          await badgesLibrary.issueBadge(BADGE_ENUM.INFLUENCER, address)
          await logIssueBadge(req.user.id, BADGE_ENUM.INFLUENCER)
        }

        res.send({ message: 'Vote has been cast!' })
      }
    )
  }
)

router.post(
  '/completed/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Will need to call this function / end point every monday to close all polls that are open

    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        poll: req.params.id
      },
      'Completing poll'
    )

    Poll.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { completed: true } },
      { new: true },
      (err, completedPoll) => {
        if (err) {
          log.error(
            {
              err,
              requestId: req.id,
              user: req.user.id,
              poll: req.params.id
            },
            'Error updating poll'
          )
          return sendError(res, 503, 'Error updating poll')
        }

        log.info(
          {
            requestId: req.id,
            user: req.user.id,
            poll: completedPoll
          },
          'Poll marked as complete successfully'
        )

        // Post the tweet
        let pollChoices = ''
        const choiceMax = []
        let choiceText = ''

        completedPoll.choices.forEach((element, key) => {
          pollChoices += element.value + ': ' + element.votes + '\n'
          choiceMax.push(parseInt(element.votes ? element.votes : 0))
          if (choiceText === '') {
            choiceText = element.value
          }

          if (Math.max(...choiceMax) == (element.votes ? element.votes : 0)) {
            choiceText = element.value
          }
        })
        // let tweet = `Topic: ${completedPoll.topic}\n\n${pollChoices}`
        // twitterLibrary.postTweet(
        //     tweet
        // )
        // .then(success => {
        // Once the tweet returns then publish on blockchain
        // Need to get the most popular choice

        // Search for the user here...

        log.info(
          {
            requestId: req.id,
            user: req.user.id,
            poll: completedPoll
          },
          'Saving poll decision in the blockchain'
        )
        decisionsLibrary
          .createDecision(
            req.body.userName,
            completedPoll._id,
            completedPoll.topic,
            choiceText + ': ' + Math.max(...choiceMax)
          )
          .then(result => {
            log.info(
              {
                requestId: req.id,
                user: req.user.id,
                poll: completedPoll
              },
              'Poll saved in the blockchain'
            )

            return res.send({ success: true, poll: completedPoll })
            // console.log('What is this:', result)
            // Then update the poll again
            // choiceText === 'Yes' ? (
            // If the choice is yes then we have
            // to do...
            // User.findOne({name: req.body.userName})
            // .then(async user => {
            // if(completedPoll.topic.includes('authority')) {
            //     await badgesLibrary.issueBadge(4, user.wallet.address)
            // } else {
            //     await badgesLibrary.issueBadge(3, user.wallet.address)
            // }
            // res.send('Badge issued for user!')
            // })
            // .catch(err => {
            // console.log('Error publishing the badge...');
            // console.log(err)
            // })
            // ) : (
            // res.send('Badge not issued for user!')
            // );
            // Badge is issued so update the user model
            // if yes versus no
          })
          .catch(err => {
            log.error(
              {
                err,
                requestId: req.id,
                user: req.user.id,
                poll: completedPoll
              },
              'Error saving poll in the blockchain'
            )
          })
        // })
        // .catch(err => {
        //     console.log(err)
        // })
      }
    )
  }
)
// Returns only closed polls
router.get(
  '/closed',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id
      },
      'Getting closed polls'
    )

    Poll.find({
      $or: [
        { completed: true },
        { expiryTime: { $lte: Date.now() } } // implying that it is done!
      ]
    })
      .sort({ $natural: -1 })
      .exec((err, polls) => {
        if (err) {
          log.error(
            {
              err,
              requestId: req.id,
              user: req.user.id
            },
            'Error reading closed polls from the database'
          )

          return sendError(res, 503, 'Error getting closed polls from db', err)
        }

        log.info(
          {
            requestId: req.id,
            user: req.user.id,
            polls
          },
          'Closed polls read successfully'
        )

        return res.status(200).json({
          polls
        })
      })
  }
)

router.get(
  '/votedOn/:userId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id
      },
      'Getting polls where user voted on'
    )

    Poll.find({
      $or: [
        { voters: req.params.userId },
        { expiryTime: { $lte: Date.now() } } // implying that it is done!
      ]
    })
      .sort({ $natural: -1 })
      .exec((err, polls) => {
        if (err) {
          log.error(
            {
              err,
              requestId: req.id,
              user: req.user.id
            },
            'Error reading polls where user voted on from the database'
          )
          return sendError(res, 503, 'Error getting polls from db', err)
        }

        log.info(
          {
            requestId: req.id,
            user: req.user.id,
            polls
          },
          'Polls retrieved successfully'
        )

        return res.status(200).json({
          polls
        })
      })
  }
)
module.exports = router
