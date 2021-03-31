const express = require('express')
const _ = require('lodash')
const router = express.Router()
const passport = require('passport')
const { ATRIUM_CONSTANTS } = require('../../config/unin-constants')
// Custom GitHub library:
const githubLibrary = require('../../lib/github')
const badges = require('../../lib/badges')
// Importing user to update the user model
const User = require('../../models/User')
const log = require('../../config/log')
const { sendError } = require('../../lib/requestUtils')

// @route GET api/github/users
// @desc Get list of all users from Github
// @access Public
router.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    log.info({ requestId: req.id }, 'Listing users in github org')
    githubLibrary
      .listMembersFromGitHubOrg(ATRIUM_CONSTANTS.GITHUB_PROFILE_NAME)
      .then(response => {
        if (response.data.length > 0) {
          // implies that there are users in the unin-interagency blockchain
          const members = []
          response.data.forEach(element => {
            // Role won't show unless admin makes this request;
            // assume that everyone will be a user
            var subset = _.pick(element, ['login', 'url', 'type'])
            if (subset.type == 'User') {
              members.push(subset)
            }
          })

          log.info(
            { requestId: req.id, members },
            'Members retrieved successfully'
          )
          res.send({
            members
          })
        } else {
          res.send({ members: [] })
        }
      })
      .catch(err => {
        log.error(
          { err, requestId: req.id },
          'Error getting Github org members list'
        )
        return sendError(
          res,
          424,
          'Error accessing the GitHub API to read users'
        )
      })
  }
)

// @route POST api/github/add
// @desc Add user to an organization
// @access Public
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        githubHandle: req.body.githubHandle,
        user: req.user.id
      },
      'Adding user to github org'
    )

    githubLibrary
      .addMembershipToGitHubOrg(
        ATRIUM_CONSTANTS.GITHUB_PROFILE_NAME,
        req.body.githubHandle
      )
      .then(response => {
        log.info(
          { requestId: req.id, githubHandle: req.body.githubHandle },
          'User added successfully to github org'
        )
        const query = {
          name: req.body.name
        }
        User.findOneAndUpdate(
          query,
          {
            githubUsername: req.body.githubHandle
          },
          {
            new: true
          }
        )
          .then(async updatedUser => {
            log.info(
              { requestId: req.id, user: req.user.id },
              'Issuing badge to user'
            )
            await badges.issueBadge(2, updatedUser.address)
            res.send(updatedUser)
          })
          .catch(err => {
            log.error(
              {
                err,
                requestId: req.id,
                githubHandle: req.body.githubHandle,
                user: req.user.id
              },
              'Error updating user in database'
            )
            return sendError(
              res,
              500,
              "Error updating the user's GitHub handle."
            )
          })
      })
      .catch(err => {
        log.error(
          {
            err,
            requestId: req.id,
            githubHandle: req.body.githubHandle,
            user: req.user.id
          },
          'Error calliing the github api'
        )
        return sendError(res, 424, 'Error accessing the GitHub API')
      })
  }
)

module.exports = router
