const express = require('express')
const router = new express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const ethers = require('../../lib/ethers')
const badges = require('../../lib/badges')
const nodemailer = require('../../lib/nodemailer')
const {
  saltAndHashPassword,
  getTokenForUser,
  getBadgesForUser,
  signToken,
  verifyToken,
  getTokenPayload
} = require('../../lib/users')
const { s3Upload, s3Download } = require('../../middleware')
const md5Hash = require('../../lib/hash')
const validationMiddleware = require('../../lib/validationMiddleware')
const { logJoiningAtrium, logIssueBadge } = require('../../lib/userActivity')
const log = require('../../config/log')
const {
  sendError,
  getAuthenticatedRequestLogDetails
} = require('../../lib/requestUtils')
const { diacriticSensitiveRegex } = require('../../lib/paramManipulation')
const EncryptDecrypt = require('../../lib/encryptDecrypt')
const encryptDecrypt = new EncryptDecrypt(process.env.ATRIUM_WALLET_SECRET)
const keccak256 = require('keccak256')
const { oneHour } = require('../../config/constants')

// Load input validation
const userSchemas = require('../../validation/users')
// Load models
const User = require('../../models/User')
const Activity = require('../../models/Activity')
const {
  ATRIUM_CONSTANTS,
  AGENCIES_LIST,
  BADGE_ENUM
} = require('../../config/unin-constants')

const allowedDomains = AGENCIES_LIST.map(agency => agency.domain.toLowerCase())
const authCookieName = 'SESSION_TOKEN'

// @route POST api/users/register
// @desc Register user
// @access Public

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        inputs: req.body
      },
      'Getting filtered users'
    )
    const allUsers = await User.find()
    const users = allUsers.filter(
      el =>
        el.name.toLowerCase().includes(req.body.prefix.toLowerCase()) ||
        el.email.includes(req.body.prefix)
    )
    return res.status(200).json({ users })
  }
)

router.get(
  '/projects',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id
      },
      'Getting users projects'
    )
    try {
      const user = await User.findOne({ _id: req.user.id }).populate('projects')
      const { projects } = user
      log.info(
        {
          requestId: req.id,
          projects
        },
        'Success getting users projects'
      )
      return res.status(200).json({ projects })
    } catch (err) {
      log.info(
        {
          requestId: req.id,
          error: err
        },
        'Can not get users projects from the database'
      )
      return sendError(
        res,
        503,
        'Error getting users projects from the database'
      )
    }
  }
)

router.get('/avatar/:s3key', async (req, res) => {
  log.info(
    {
      requestId: req.id
    },
    'Getting avatar'
  )
  try {
    s3Download(req.params.s3key).pipe(res)
  } catch (err) {
    log.error({ err, requestId: req.id }, 'Failed to get avatar')
  }
})

router.get(
  '/refresh-token',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id
      },
      'Refreshing token for user'
    )
    // Find user by email
    User.findOne({ email: req.user.email }).then(user => {
      // Check if user exists
      if (!user) {
        log.warn(
          {
            requestId: req.id,
            user: req.user.id
          },
          'User not found in database'
        )
        return sendError(res, 404, 'Email not found')
      }

      getTokenForUser(user, (err, token) => {
        if (err) {
          log.error(
            {
              err,
              requestId: req.id,
              user: req.user.id
            },
            'Error generating token for user'
          )
          return
        }
        log.info(
          {
            requestId: req.id,
            user: req.user.id,
            token
          },
          'Token generated successfully'
        )

        const tokenOnly = token.split(' ')[1]
        const cookieConfig = {
          expires: new Date(Date.now() + oneHour * 8000),
          httpOnly: true,
          secure: true
        }
        res.cookie(authCookieName, tokenOnly, cookieConfig)
        res.json({
          success: true
        })
      })
    })
  }
)

router.put(
  '/register',
  s3Upload.single('avatar'),
  validationMiddleware(userSchemas.register),
  async (req, res) => {
    const encryptDecrypt = req.app.get('encryptDecrypt')
    log.info(
      {
        requestId: req.id
      },
      'Registering user'
    )

    const retrievedUser = await User.findOne({ email: req.body.email })
    if (retrievedUser.emailVerified) {
      const newWallet = ethers.createWallet()
      const encryptedWallet = await encryptDecrypt.encrypt(newWallet)
      retrievedUser.name = req.body.name
      retrievedUser.surname = req.body.surname
      retrievedUser.wallet = encryptedWallet.encrypted
      retrievedUser.address = newWallet.address
      retrievedUser.acceptsEmail = true

      if (req.file && req.file.key) {
        retrievedUser.avatar = `${
          req.connection.encrypted ? 'https' : 'http'
        }://${req.headers.host}${req.baseUrl}/avatar/${req.file.key}`
      }

      // Issue badge before saving user to handle error before saving data in the database
      try {
        log.info(
          {
            requestId: req.id,
            user: retrievedUser._id
          },
          'Issuing badge for Membership'
        )
        const hasBadge = await badges.hasBadge(
          BADGE_ENUM.MEMBER,
          retrievedUser.address
        )
        if (!hasBadge) {
          await badges.issueBadge(BADGE_ENUM.MEMBER, retrievedUser.address)
          await logIssueBadge(retrievedUser.id, BADGE_ENUM.MEMBER).catch(
            logError => {
              log.error(
                {
                  err: logError,
                  requestId: req.id,
                  user: retrievedUser._id
                },
                'Error logging badge issue in activity'
              )
            }
          )
        }
      } catch (err) {
        log.error(
          {
            err,
            requestId: req.id,
            user: retrievedUser._id
          },
          'Error issuing badge'
        )
        return sendError(res, 503, 'Error issuing badge')
      }

      try {
        const hashedPassword = await saltAndHashPassword(req.body.password)
        retrievedUser.password = hashedPassword

        const savedUser = await retrievedUser.save()

        getTokenForUser(savedUser, (err, token) => {
          if (err) {
            log.error(
              {
                err: err,
                requestId: req.id
              },
              'Error generating token'
            )
            return sendError(res, 500, 'Error generating token')
          }

          log.info(
            {
              requestId: req.id,
              user: savedUser._id,
              token
            },
            'Token generated correctly'
          )
          const tokenOnly = token.split(' ')[1]
          const cookieConfig = {
            expires: new Date(Date.now() + oneHour * 8000),
            httpOnly: true,
            secure: true
          }
          res.cookie(authCookieName, tokenOnly, cookieConfig)
          res.json({
            success: true
          })
        })
      } catch (err) {
        log.error(
          {
            err,
            requestId: req.id
          },
          'Error saving user in database'
        )
        sendError(res, 503, 'Error creating user')
      }
    } else {
      log.info(
        {
          requestId: req.id
        },
        'Mail not verified or pre-registration was not completed'
      )
      // Email not verified
      // Or the person is not in the db
      return sendError(
        res,
        412,
        'Email is not verified or the account does not exist in the database. Please contact an administrator.'
      )
    }
  }
)

router.post('/invite', async (req, res) => {
  console.log(req.body)

  const reportsPassword = keccak256(process.env.ADMIN_PASSWORD).toString('hex')
  const { email, password, name, company, role, adminPassword } = req.body
  console.log(req.body)
  console.log(reportsPassword)

  if (adminPassword !== reportsPassword) {
    return res.status(403).send()
  }
  const emailHash = md5Hash(email)
  const hashedPassword = await saltAndHashPassword(password)

  const newWallet = ethers.createWallet()
  const encryptedWallet = await encryptDecrypt.encrypt(newWallet)

  const user = {
    email,
    emailVerified: true,
    emailHash,
    name,
    wallet: encryptedWallet.encrypted,
    address: newWallet.address,
    role,
    company,
    acceptsEmail: true,
    password: hashedPassword
  }

  try {
    await User.findOneAndUpdate({ email: user.email }, user, { upsert: true })
  } catch (e) {
    return res.status(500).send()
  }

  res.send()
})

// @route POST api/users/email-forgot-password
// @desc Send email for user to reset password
// @access Public
router.post(
  '/email-forgot-password',
  validationMiddleware(userSchemas.forgotPassword),
  async (req, res) => {
    log.info({ requestId: req.id }, 'User forgot password')
    const email = req.body.email.toLowerCase()
    const user = await User.findOne({ email })
    if (!user) {
      log.error({ requestId: req.id, email }, 'User not found')
      return sendError(res, 404, `email not found`)
    }
    if (!user.emailVerified || !user.password) {
      return sendError(res, 403, 'unverified account')
    }
    const resetPasswordCache = req.app.get('resetPasswordCache')
    signToken(
      { email },
      (err, token) => {
        if (err) {
          log.error({ requestId: req.id, email }, err)
          return sendError(res, 500, 'unknown error')
        }
        resetPasswordCache.set(email, token)
        nodemailer._sendForgotPasswordEmail(email, token)
        res.status(200).end()
      },
      '15m'
    )
  }
)

router.post(
  '/reset-password',
  validationMiddleware(userSchemas.resetPassword),
  async (req, res) => {
    log.info({ requestId: req.id }, 'resetting user password')
    const { token, password } = req.body
    const resetPasswordCache = req.app.get('resetPasswordCache')
    try {
      const { email } = verifyToken(token)
      const tokenUnredeemed = token === resetPasswordCache.get(email)
      if (!tokenUnredeemed) {
        log.error(
          { requestId: req.id, email },
          'Token has already been redeemed'
        )
        return sendError(res, 403, 'Token has already been redeemed')
      }
      const hashedPassword = await saltAndHashPassword(password)
      await User.findOneAndUpdate({ email }, { password: hashedPassword })
      resetPasswordCache.del(email)
      res.status(200).end()
    } catch (err) {
      log.error({ requestId: req.id }, 'Reset token expired or invalid')
      return sendError(res, 403, 'Invalid or expired reset password link')
    }
  }
)

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post(
  '/login',
  validationMiddleware(userSchemas.login),
  async (req, res) => {
    log.info(
      {
        requestId: req.id
      },
      'User loging in'
    )

    const email = req.body.email.toLowerCase()
    const password = req.body.password

    // Find user by email
    const user = await User.findOne({ email })
    // Check if user exists
    if (!user) {
      log.info(
        {
          requestId: req.id,
          email
        },
        'User not found'
      )
      return sendError(res, 404, 'Email not found')
    }

    if (!user.emailVerified || !user.password) {
      return sendError(res, 403, 'Unverified account')
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
      log.info(
        {
          requestId: req.id,
          email
        },
        'Passwords match'
      )
      // User matched
      // Create JWT Payload

      getTokenForUser(user, (err, token) => {
        if (err) {
          log.error(
            {
              err,
              requestId: req.id,
              email
            },
            'Error getting token for user'
          )
          return sendError(res, 500, 'Error getting token for user')
        }

        log.info(
          {
            requestId: req.id,
            token
          },
          'Token created successfully'
        )
        const tokenOnly = token.split(' ')[1]
        const cookieConfig = {
          expires: new Date(Date.now() + oneHour * 8000),
          httpOnly: true,
          secure: true
        }
        res.cookie(authCookieName, tokenOnly, cookieConfig)
        console.log(res.cookies)

        const payload = verifyToken(tokenOnly)
        res.json({
          success: true,
          payload
        })
      })
    } else {
      log.info(
        {
          requestId: req.id,
          email
        },
        'Wrong password'
      )
      return sendError(res, 400, 'Wrong credentials')
    }
  }
)

// @route POST api/users/logout
// @desc Remove authentication cookie
router.post('/logout', (req, res) => {
  const cookieConfig = {
    expires: new Date(0),
    httpOnly: true,
    secure: true
  }
  res.cookie(authCookieName, '', cookieConfig)
  res.json({
    success: true,
    message: 'User logged out.'
  })
})

// @route GET api/users/me
// @desc Provide User information
router.get('/me', (req, res) => {
  log.info(
    {
      requestId: req.id
    },
    'User getting information'
  )
  try {
    const authCookie = req.cookies[authCookieName]
    if (!authCookie) {
      log.info(
        {
          requestId: req.id
        },
        'Cookie not found'
      )
      return sendError(res, 404, 'Cookie not found')
    }

    const payload = verifyToken(authCookie)
    res.json({
      success: true,
      payload
    })
  } catch (error) {
    log.info(
      {
        requestId: req.id
      },
      'Error on token verify.'
    )
    return sendError(res, 500, 'Error on token verify.')
  }
})

// @route GET api/users/email-verify/:email
// @desc User will receive an email from the unin inbox with this link
// user will update the verified flag for their account in the db and then
// they should be taken to the register page once this is clicked
// @access Public
router.get('/email-verify/:emailHash/:invitationCode', (req, res) => {
  log.info(
    {
      requestId: req.id,
      emailHash: req.params.emailHash,
      invitationCode: req.params.invitationCode
    },
    'Verifying email'
  )
  // Get the LRU cache from the app
  const invitationCache = req.app.get('invitationCache')
  const invitationCode = req.params.invitationCode
  const emailHash = req.params.emailHash

  // Check if the stored email matches
  const authorized = emailHash === invitationCache.get(invitationCode)

  if (!authorized) {
    log.error(
      {
        requestId: req.id
      },
      'Error Invitation Code did not match Hash or is Expired'
    )
    return sendError(res, 503, 'Error registering user')
  }

  // return true
  // then take them to the register page
  User.findOne({ emailHash })
    .then(user => {
      if (user) {
        const retrievedUser = user
        // Found one!
        log.info(
          {
            requestId: req.id,
            user: user._id
          },
          'User found successfully'
        )
        retrievedUser.emailVerified = true
        retrievedUser
          .save()
          .then(() => {
            // Email is verified... let this user create an account!
            log.info(
              {
                requestId: req.id,
                user: user._id
              },
              'User email verified successfully'
            )
            res.status(200).send({
              message:
                'User is now verified - please visit the register page to complete your registration.'
            })
          })
          .catch(err => {
            log.info(
              {
                err,
                requestId: req.id,
                user: user._id
              },
              'Error saving user in database'
            )
            // Error saving the verified user!
            return sendError(
              res,
              503,
              'User verification was not completed. Please try again'
            )
          })
      } else {
        log.info(
          {
            requestId: req.id,
            emailHash: req.params.emailHash
          },
          'User not found with hash'
        )
        return sendError(res, 404, 'User not found with hash')
        // User with this email does not exist!
      }
    })
    .catch(err => {
      log.error(
        {
          err,
          requestId: req.id
        },
        'Error finding user in database'
      )
      return sendError(res, 503, 'Error finding user in database')
    })
})

// @route POST api/users/email-to-sign-up
// @desc User will receive an email from the unin inbox
// link will be avail to in the email for them to verify their account
// @access Public
router.post('/email-to-sign-up', async (req, res) => {
  const invitationCache = req.app.get('invitationCache')
  // if the handle matches then we need to send an email to
  // the user
  const email = req.body.email.toLowerCase()
  let userEmailDomain = null
  if (email.indexOf('@') >= 0) {
    userEmailDomain = email.split('@')[1]
  }
  log.info(
    {
      requestId: req.id,
      email
    },
    'Pre-registering with email'
  )
  const allowedRegistrarList = AGENCIES_LIST.map(agency => agency.registrar)

  if (process.env.NODE_ENV === 'development') {
    allowedRegistrarList.push(/@appliedblockchain.com\s*$/)
  }

  // Check if user exists
  let user
  try {
    user = await User.findOne({ email })
  } catch (e) {
    log.error(
      {
        e,
        requestId: req.id,
        email
      },
      'Error creating user invitation'
    )
  }

  if (userEmailDomain && allowedDomains.indexOf(userEmailDomain) >= 0) {
    // Generate random code and update the invitation cache
    const invitationCode = md5Hash(Math.random * 1e18)
    const emailHash = md5Hash(email)
    invitationCache.set(invitationCode, emailHash)

    // User is found, do not create a new user.
    if (user) {
      nodemailer._sendWelcomeEmail(email, emailHash, invitationCode)

      if (user.emailVerified) {
        return sendError(
          res,
          500,
          'Your email is already registered and verified. Please login to continue.'
        )
      }

      return sendError(
        res,
        500,
        'Updated Invitation Sent. Please check your inbox and confirm your email. If you do not see your email within 5 - 10 minutes, please check your junk mail folder or contact blockchain@uninnovation.network.'
      )
    }

    // Need to save the user here in the db with the following parameters:
    // email, emailVerified set to false, and emailHash generated with MD5 fucntion
    const newUser = new User({
      email,
      emailVerified: false,
      emailHash
    })
    newUser
      .save()
      .then(response => {
        if (!process.env.TESTING) {
          nodemailer._sendWelcomeEmail(
            response.email,
            emailHash,
            invitationCode
          )
        }
        logJoiningAtrium(newUser.id).catch(err => {
          log.error(
            {
              err,
              requestId: req.id,
              email
            },
            'Error logging joining atrium'
          )
        })
        log.info(
          {
            requestId: req.id,
            email
          },
          'Pre-register complete'
        )
        return res.status(200).end()
      })
      .catch(err => {
        log.error(
          {
            err,
            requestId: req.id,
            email
          },
          'Error reaching database to save new user'
        )
        return sendError(
          res,
          500,
          'Error creating the user in the database. Please try again'
        )
      })
  } else {
    log.info(
      {
        requestId: req.id,
        email
      },
      'Email registrar not allowed on The Atrium platform'
    )
    return sendError(
      res,
      403,
      `Thanks for your interest in The Atrium. Currently, the platform is only open to UN entities. If you are part of the UN, please be sure to use your official email address. For other inquiries, please contact blockchain@uninnovation.network. Thank you.`
    )
  }
})

router.post(
  '/update-learn-flag/:userId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.params.userId
      },
      'Updating learn tutorial flag'
    )

    User.findOneAndUpdate(
      {
        _id: req.params.userId
      },
      {
        $set: { learnPageFlag: true }
      },
      {
        new: true
      }
    ).exec((err, updatedUser) => {
      if (err) {
        log.error(
          {
            err,
            requestId: req.id,
            user: req.params.userId
          },
          'Error reaching database to save user'
        )
        return sendError(res, 503, 'Error updating the learn flag', err)
      }

      getTokenForUser(updatedUser, (tokenErr, token) => {
        if (tokenErr) {
          log.error(
            {
              err: tokenErr,
              requestId: req.id,
              user: req.params.userId
            },
            'Error generating the token'
          )
          return sendError(res, 500, 'Error generating the token')
        }
        log.info(
          {
            requestId: req.id,
            user: req.params.userId,
            token
          },
          'Token generated successfully'
        )
        const tokenOnly = token.split(' ')[1]
        const cookieConfig = {
          expires: new Date(Date.now() + oneHour * 8000),
          httpOnly: true,
          secure: true
        }
        res.cookie(authCookieName, tokenOnly, cookieConfig)
        return res.status(200).json({
          response: 'Learn flag updated!'
        })
      })
    })
  }
)

router.post(
  '/update-explore-flag/:userId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.params.userId
      },
      'Updating explore tutorial flag'
    )
    User.findOneAndUpdate(
      {
        _id: req.params.userId
      },
      {
        $set: { explorePageFlag: true }
      },
      {
        new: true
      }
    ).exec((err, updatedUser) => {
      if (err) {
        log.error(
          {
            err,
            requestId: req.id,
            user: req.params.userId
          },
          'Error reaching database to update user'
        )
        return sendError(res, 503, 'Error updating the explore flag', err)
      }
      getTokenForUser(updatedUser, (tokenErr, token) => {
        if (tokenErr) {
          log.error(
            {
              err: tokenErr,
              requestId: req.id,
              user: req.params.userId
            },
            'Error generating token'
          )
          return sendError(res, 500, 'Error generating the token')
        }
        log.info(
          {
            requestId: req.id,
            user: req.params.userId,
            token
          },
          'Token generated successfully'
        )
        const tokenOnly = token.split(' ')[1]
        const cookieConfig = {
          expires: new Date(Date.now() + oneHour * 8000),
          httpOnly: true,
          secure: true
        }
        res.cookie(authCookieName, tokenOnly, cookieConfig)
        return res.status(200).json({
          response: 'Explore flag updated!'
        })
      })
    })
  }
)

router.post(
  '/update-engage-flag/:userId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.params.userId
      },
      'Updating engage tutorial flag'
    )
    User.findOneAndUpdate(
      {
        _id: req.params.userId
      },
      {
        $set: { engagePageFlag: true }
      },
      {
        new: true
      }
    ).exec((err, updatedUser) => {
      if (err) {
        log.error(
          {
            err,
            requestId: req.id,
            user: req.params.userId
          },
          'Error reaching database to update user'
        )
        return sendError(res, 503, 'Error updating the engage flag', err)
      }

      getTokenForUser(updatedUser, (tokenErr, token) => {
        if (tokenErr) {
          log.error(
            {
              err: tokenErr,
              requestId: req.id,
              user: req.params.userId
            },
            'Error generating token'
          )
          return sendError(res, 500, 'Error generating the token')
        }
        log.info(
          {
            requestId: req.id,
            user: req.params.userId,
            token
          },
          'Token generated successfully'
        )
        const tokenOnly = token.split(' ')[1]
        const cookieConfig = {
          expires: new Date(Date.now() + oneHour * 8000),
          httpOnly: true,
          secure: true
        }
        res.cookie(authCookieName, tokenOnly, cookieConfig)
        return res.status(200).json({
          response: 'Engage flag updated!'
        })
      })
    })
  }
)

router.get(
  '/activity',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id
      },
      'Getting user activity'
    )

    try {
      const activityList = await Activity.find({
        user: req.user.id
      })
        .sort({ createdAt: 'descending' })
        .populate([
          {
            path: 'project'
          },
          {
            path: 'poll'
          },
          {
            path: 'learningResource'
          },
          {
            path: 'discussion'
          }
        ])
        .exec()
      log.info(
        {
          requestId: req.id,
          user: req.user.id
        },
        'Updating learn tutorial flag'
      )
      return res.status(200).json(activityList)
    } catch (err) {
      log.error(
        {
          err,
          requestId: req.id,
          user: req.user.id
        },
        'Error retrieving user activity from database'
      )
      return sendError(res, 503, 'Error getting activity for user')
    }
  }
)

router.patch(
  '/',
  passport.authenticate('jwt', { session: false }),
  s3Upload.single('avatar'),
  validationMiddleware(userSchemas.updateUser),
  async (req, res) => {
    const informationToUpdate = req.body
    if (req.file && req.file.key) {
      informationToUpdate.avatar = `${
        req.connection.encrypted ? 'https' : 'http'
      }://${req.headers.host}${req.baseUrl}/avatar/${req.file.key}`
    }

    log.info(
      getAuthenticatedRequestLogDetails(req, { update: informationToUpdate }),
      'Updating user information'
    )

    User.findByIdAndUpdate(
      req.user.id,
      informationToUpdate,
      { new: true },
      (updateErr, updatedUser) => {
        if (updateErr) {
          log.error(
            getAuthenticatedRequestLogDetails(req, { err: updateErr }),
            'Error updating user'
          )

          return sendError(res, 500, 'Error updating user in the database')
        }

        getTokenForUser(updatedUser, (tokenError, token) => {
          if (tokenError) {
            log.error(
              getAuthenticatedRequestLogDetails(req, { err: tokenError }),
              'Error generating token'
            )
            return sendError(res, 500, 'Error generating token')
          }

          const tokenOnly = token.split(' ')[1]
          const cookieConfig = {
            expires: new Date(Date.now() + oneHour * 8000),
            httpOnly: true,
            secure: true
          }
          res.cookie(authCookieName, tokenOnly, cookieConfig)
          res.json({
            success: true,
            ...updatedUser._doc
          })
        })
      }
    )
  }
)

router.post(
  '/change-password',
  passport.authenticate('jwt', { session: false }),
  validationMiddleware(userSchemas.changePassword),
  async (req, res) => {
    log.info(getAuthenticatedRequestLogDetails(req), 'Change user password')

    try {
      const hashedPassword = await saltAndHashPassword(req.body.password)

      User.findByIdAndUpdate(
        req.user.id,
        {
          password: hashedPassword
        },
        {
          new: true
        },
        (dbErr, updatedUser) => {
          if (dbErr) {
            log.error(
              getAuthenticatedRequestLogDetails(req, { err: dbErr }),
              'Error updating user'
            )
            return sendError(res, 500, 'Error updating user')
          }

          getTokenForUser(updatedUser, (err, token) => {
            if (err) {
              log.error(
                getAuthenticatedRequestLogDetails(req, { err }),
                'Error generating token'
              )
              return sendError(res, 500, 'Error generating token')
            }

            log.info(
              getAuthenticatedRequestLogDetails(req),
              'Token generated correctly'
            )
            const tokenOnly = token.split(' ')[1]
            const cookieConfig = {
              expires: new Date(Date.now() + oneHour * 8000),
              httpOnly: true,
              secure: true
            }
            res.cookie(authCookieName, tokenOnly, cookieConfig)
            res.json({
              success: true
            })
          })
        }
      )
    } catch (err) {
      log.error(
        getAuthenticatedRequestLogDetails(req, { err }),
        'Error changing password'
      )
      return sendError(res, 500, 'Error changing password')
    }
  }
)

router.post(
  '/avatar',
  passport.authenticate('jwt', { session: false }),
  s3Upload.single('avatar'),
  async (req, res) => {
    log.info(getAuthenticatedRequestLogDetails(req), 'Uploading avatar')

    try {
      User.findByIdAndUpdate(
        req.user.id,
        {
          avatar: `${req.connection.encrypted ? 'https' : 'http'}://${
            req.headers.host
          }${req.baseUrl}/avatar/${req.file.key}`
        },
        {
          new: true
        },
        (dbErr, updatedUser) => {
          if (dbErr) {
            log.error(
              getAuthenticatedRequestLogDetails(req, { err: dbErr }),
              'Error updating user'
            )
            return sendError(res, 500, 'Error updating user')
          }

          getTokenForUser(updatedUser, (err, token) => {
            if (err) {
              log.error(
                getAuthenticatedRequestLogDetails(req, { err }),
                'Error generating token'
              )
              return sendError(res, 500, 'Error generating token')
            }

            log.info(
              getAuthenticatedRequestLogDetails(req),
              'Avatar updated successfully'
            )
            const tokenOnly = token.split(' ')[1]
            const cookieConfig = {
              expires: new Date(Date.now() + oneHour * 8000),
              httpOnly: true,
              secure: true
            }
            res.cookie(authCookieName, tokenOnly, cookieConfig)
            res.json({
              success: true
            })
          })
        }
      )
    } catch (err) {
      log.error(
        getAuthenticatedRequestLogDetails(req, { err }),
        'Error updating avatar'
      )
      return sendError(res, 500, 'Error updating avatar')
    }
  }
)

router.get(
  '/search',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      getAuthenticatedRequestLogDetails(req, req.query),
      'Searching for users'
    )
    const name = req.query.name || ''
    const email = req.query.email || ''
    const company = req.query.company || ''

    if (name || email || company) {
      User.find(
        {
          _id: { $ne: req.user.id },
          name: {
            $regex: diacriticSensitiveRegex(name),
            $options: 'i'
          },
          email: {
            $regex: diacriticSensitiveRegex(email),
            $options: 'i'
          },
          company: {
            $regex: diacriticSensitiveRegex(company),
            $options: 'i'
          }
        },
        'name email avatar company role address',
        (findErr, users) => {
          if (findErr) {
            log.error(
              getAuthenticatedRequestLogDetails(req, { err: findErr }),
              'Searching for users'
            )
            return sendError(res, 503, 'Error finding users')
          }
          log.info(
            getAuthenticatedRequestLogDetails(req, users),
            'Users found with success'
          )
          return res.json({ users })
        }
      )
    } else {
      log.warn(
        getAuthenticatedRequestLogDetails(req, req.query),
        'No params provided for search'
      )
      return res.json({ users: [] })
    }
  }
)

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      getAuthenticatedRequestLogDetails(req, { user: req.params.id }),
      'Getting details for user'
    )
    console.log(req.params.id)
    if (req.params.id) {
      try {
        const user = await User.findById(
          req.params.id,
          'name email avatar company role address'
        ).exec()

        log.info(
          getAuthenticatedRequestLogDetails(req, { user }),
          'Found user details'
        )

        const userBadges = await getBadgesForUser(user.address)

        log.info(
          getAuthenticatedRequestLogDetails(req, { userBadges }),
          'Found user badges'
        )

        const activityList = await Activity.find({
          user: req.params.id
        })
          .sort({ createdAt: 'descending' })
          .populate([
            {
              path: 'project'
            },
            {
              path: 'poll'
            },
            {
              path: 'learningResource'
            },
            {
              path: 'discussion'
            }
          ])
          .exec()
        log.info(
          getAuthenticatedRequestLogDetails(req, { activityList }),
          'Found user activity'
        )

        res.json({ user, userBadges, activityList })
      } catch (err) {
        sendError(res, 500, 'Error obtaining user information', err)
      }
    } else {
      sendError(res, 400, 'No user id provided')
    }
  }
)

module.exports = router
