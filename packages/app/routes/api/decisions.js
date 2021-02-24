const express = require('express')
const _ = require('lodash')
const router = express.Router()
const passport = require('passport')
// Custom ethers blockchain library:
const decisionsLibrary = require('../../lib/decisions')
const log = require('../../config/log')
// Importing user to update the user model

// @route GET api/decisions/
// @desc Get all decisions
// @access Public
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    log.info(
      { requestId: req.id, decisionId: req.params.id },
      'Getting decisions from blockchain'
    )
    decisionsLibrary
      .getAllDecisionsFromBlockchain(req.params.id)
      .then(result => {
        const response = []
        result.forEach(async (promiseItem, index) => {
          await promiseItem
            .then(promiseResult => {
              // console.log('I am here:', promiseResult)
              if (!promiseResult.includes('Error')) response.push(promiseResult)
              if (index === result.length - 1) {
                console.log('Yolo', response)
                res.send(response)
              }
            })
            .catch(err => {
              // console.log(1)
              // console.log('I am here instead -_-', err)
              return
              // return next(err);
            })
        })
      })
      .catch(err => {
        console.log(1, 'Error hitting the end point')
      })
  }
)

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // decisionsLibrary.createDecision(user_id)
    decisionsLibrary
      .createDecision(
        '5cc08a271294d944184baaaf',
        req.body.pollId,
        req.body.twitterLink,
        req.body.topic,
        req.body.pollResult
      )
      .then(result => {
        console.log('What is this:', result)
        // Do we update the poll here?
      })
  }
)

module.exports = router
