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
  verifyToken
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
const Project = require('../../models/Project')

const Activity = require('../../models/Activity')
const { AGENCIES_LIST, BADGE_ENUM } = require('../../config/unin-constants')

const allowedDomains = AGENCIES_LIST.map(agency => agency.domain.toLowerCase())
const authCookieName = 'SESSION_TOKEN'
const userFieldSelection = 'name email avatar company' // select only name and email from users
const projectsPopulateParams = [
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
      }
    ]
  }
]
const commentsPopulateParams = [
  {
    path: 'mentions',
    select: userFieldSelection
  },
  {
    path: 'user',
    select: userFieldSelection
  }
]

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
    const users = await User.find({
      $or: [
        {
          name: {
            $regex: req.body.prefix,
            $options: 'gi'
          }
        },
        {
          email: {
            $regex: req.body.prefix,
            $options: 'gi'
          }
        }
      ]
    })
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
      'User is getting own projects'
    )
    try {
      const user = await User.findOne({ _id: req.user.id }).populate({
        path: 'projects',
        populate: projectsPopulateParams
      })
      let { projects } = user
      if (req.query.sort === 'asc') {
        projects = projects.sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
        )
      } else {
        projects = projects.sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
        )
      }
      const pageCounter = Math.ceil(projects.length / req.query.limit)
      projects = projects.splice(req.query.offset, req.query.limit)
      log.info(
        {
          requestId: req.id,
          projects,
          pageCounter
        },
        'Success getting project list'
      )
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

router.get(
  '/:userId/projects',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id
      },
      'Getting user projects'
    )
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate({
        path: 'projects',
        populate: projectsPopulateParams
      })
      let { projects } = user
      projects = projects.filter(project => project.published)
      if (req.query.sort === 'asc') {
        projects = projects.sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
        )
      } else {
        projects = projects.sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
        )
      }
      const pageCounter = Math.ceil(projects.length / req.query.limit)
      projects = projects.splice(req.query.offset, req.query.limit)
      log.info(
        {
          requestId: req.id,
          projects,
          pageCounter
        },
        'Success getting project list'
      )
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

router.get(
  '/latestProject',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id
      },
      'User is getting latest project'
    )

    try {
      const user = await User.findOne({ _id: req.user.id }).populate({
        path: 'projects',
        populate: projectsPopulateParams
      })
      let { projects } = user
      projects = projects.sort((a, b) =>
        a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
      )
      const project = projects[0]
      return res.status(200).json({ project })
    } catch (error) {
      log.info(
        {
          requestId: req.id,
          error: error
        },
        'Can not get latest project from the database'
      )
      return sendError(
        res,
        503,
        'Error getting latest project from the database'
      )
    }
  }
)

router.get(
  '/likes',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id
      },
      'User is getting likes'
    )

    try {
      const user = await User.findOne({ _id: req.user.id }).populate({
        path: 'projects',
        populate: projectsPopulateParams
      })
      const { projects } = user
      const likes = projects.reduce((acc, el) => acc + el.likes.length, 0)
      return res.status(200).json({ likes })
    } catch (error) {
      log.info(
        {
          requestId: req.id,
          error: error
        },
        'Can not get likes from the database'
      )
      return sendError(res, 503, 'Error getting likes from the database')
    }
  }
)

router.get(
  '/comments',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id
      },
      'User is getting own comments'
    )
    try {
      const user = await User.findOne({ _id: req.user.id }).populate({
        path: 'comments',
        populate: commentsPopulateParams
      })
      let { comments } = user
      if (req.query.sort === 'asc') {
        comments = comments.sort((a, b) =>
          a.date > b.date ? 1 : b.date > a.date ? -1 : 0
        )
      } else {
        comments = comments.sort((a, b) =>
          a.date < b.date ? 1 : b.date < a.date ? -1 : 0
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
        'Can not get comments from the database'
      )
      return sendError(res, 503, 'Error getting comments from the database')
    }
  }
)

router.get(
  '/bookmarks',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id
      },
      'User is getting own bookmarks'
    )
    try {
      const user = await User.findOne({ _id: req.user.id }).populate({
        path: 'bookmarks',
        populate: projectsPopulateParams
      })
      let { bookmarks } = user
      if (req.query.sort === 'asc') {
        bookmarks = bookmarks.sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
        )
      } else {
        bookmarks = bookmarks.sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
        )
      }
      const pageCounter = Math.ceil(bookmarks.length / req.query.limit)
      bookmarks = bookmarks.splice(req.query.offset, req.query.limit)
      log.info(
        {
          requestId: req.id,
          bookmarks,
          pageCounter
        },
        'Success getting bookmarks list'
      )
      return res.status(200).json({ bookmarks, pageCounter })
    } catch (error) {
      log.info(
        {
          requestId: req.id,
          error: error
        },
        'Can not get bookmarks from the database'
      )
      return sendError(res, 503, 'Error getting bookmarks from the database')
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
        res.json({ user })
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
    const newWallet = ethers.createWallet()
    const encryptedWallet = await encryptDecrypt.encrypt(newWallet)
    retrievedUser.name = req.body.name
    retrievedUser.surname = req.body.surname
    retrievedUser.wallet = encryptedWallet.encrypted
    retrievedUser.address = newWallet.address
    retrievedUser.acceptsEmail = true
    retrievedUser.registrationCompleted = true

    if (req.file && req.file.key) {
      retrievedUser.avatar = `${
        req.connection.encrypted ? 'https' : 'http'
      }://${process.env.ATTACHMENT_URL}${req.baseUrl}/avatar/${req.file.key}`
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
        // res.cookie(authCookieName, tokenOnly, cookieConfig)
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
    password: hashedPassword,
    registrationCompleted: true
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
          .then(({ registrationCompleted, email }) => {
            // Email is verified... let this user create an account!
            log.info(
              {
                requestId: req.id,
                user: user._id
              },
              'User email verified successfully'
            )
            res.status(200).send({
              email,
              registrationCompleted,
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
    if (user && user.registrationCompleted) {
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

    // Prevent save another pre-registration email
    if (user && !user.registrationCompleted)
      newUser.save = () => new Promise(resolve => resolve(user))

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
      if (!req.query.offset)
        throw new Error('Query offset parameter is missing')
      const skip = parseInt(req.query.offset)

      const activityList = await Activity.find({
        user: req.user.id
      })
        .skip(skip)
        .limit(7)
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

router.post(
  '/change-password',
  passport.authenticate('jwt', { session: false }),
  // validationMiddleware(userSchemas.changePassword),
  async (req, res) => {
    log.info(getAuthenticatedRequestLogDetails(req), 'Change user password')

    try {
      const user = await User.findById(req.user.id)
      if (await bcrypt.compare(req.body.currentPassword, user.password)) {
        if (!(await bcrypt.compare(req.body.password, user.password))) {
          const hashedPassword = await saltAndHashPassword(req.body.password)
          user.password = hashedPassword
          await user.save()
          getTokenForUser(user, (err, token) => {
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
        } else {
          return sendError(res, 500, 'This password was used in the past')
        }
      } else {
        return sendError(res, 500, 'Current password is not correct')
      }
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
            process.env.ATTACHMENT_URL
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
    const queryKeys = Object.entries(req.query)

    if (queryKeys.length > 0) {
      const searchQuery = queryKeys.map(([key, value]) => ({
        [key]: {
          $regex: diacriticSensitiveRegex(value),
          $options: 'gi'
        }
      }))
      try {
        const users = await User.find(
          {
            _id: { $ne: req.user.id },
            $or: searchQuery
          },
          'name email avatar company role address'
        ).exec()

        log.info(
          getAuthenticatedRequestLogDetails(req, users),
          'Users found with success'
        )
        return res.json({ users })
      } catch (e) {
        log.error(
          getAuthenticatedRequestLogDetails(req, { err: e }),
          'Searching for users'
        )
        return sendError(res, 503, 'Error finding users')
      }
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
          req.params.id
          // 'name email avatar company role address'
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
          .limit(7)
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

router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  s3Upload.single('avatar'),
  // validationMiddleware(userSchemas.updateUser),
  async (req, res) => {
    const informationToUpdate = req.body
    if (req.body.websites)
      informationToUpdate.websites = req.body.websites.split(',')
    else informationToUpdate.websites = []
    if (req.file && req.file.key) {
      informationToUpdate.avatar = `${
        req.connection.encrypted ? 'https' : 'http'
      }://${process.env.ATTACHMENT_URL}${req.baseUrl}/avatar/${req.file.key}`
    }
    log.info(
      getAuthenticatedRequestLogDetails(req, { update: informationToUpdate }),
      'Updating user information'
    )

    User.findByIdAndUpdate(
      req.params.id,
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
          res.status(204)
          res.cookie(authCookieName, tokenOnly, cookieConfig)
          res.json({
            success: true
          })
        })
      }
    )
  }
)

router.post(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      getAuthenticatedRequestLogDetails(req, { user: req.params.id }),
      'Deleting user from database'
    )
    if (req.params.id) {
      try {
        await User.findByIdAndDelete(req.params.id)
        log.info('User deleted successfully')
        res.json({})
      } catch (err) {
        sendError(res, 500, 'Error deleting user', err)
      }
    } else {
      sendError(res, 400, 'No such user in database')
    }
  }
)

router.patch(
  '/:projectId/bookmark',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        project: req.params.projectId
      },
      'User is bookmarking project'
    )
    Project.findOne({ _id: req.params.projectId }).exec(
      async (err, project) => {
        if (err) {
          log.info(
            {
              err,
              requestId: req.id,
              user: req.user.id,
              project: req.params.projectId
            },
            'Error finding project'
          )
          return sendError(res, 503, 'Error bookmarking project')
        }
        const user = await User.findById(req.user.id)

        let isBookmarked = false
        let bookmarks = user.bookmarks
          ? user.bookmarks.filter(l => {
              const isCurrentProject = l.equals(project.id)
              if (isCurrentProject) {
                isBookmarked = true
              }
              return !isCurrentProject
            })
          : []

        if (!isBookmarked) {
          bookmarks = [...bookmarks, project.id]
        }
        user.bookmarks = bookmarks
        user
          .save()
          .then(async () => {
            log.info(
              {
                requestId: req.id,
                user: req.user.id,
                project: req.params.projectId
              },
              'Project bookmarked successfully'
            )
            getTokenForUser(user, (tokenError, token) => {
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
              res.status(204)
              res.cookie(authCookieName, tokenOnly, cookieConfig)
              res.json({
                success: true
              })
            })
          })
          .catch(err => {
            log.error(
              {
                err,
                requestId: req.id,
                user: req.user.id,
                project: req.params.projectId
              },
              'Error saving user'
            )
            return sendError(res, 503, 'Error bookmarking project')
          })
      }
    )
  }
)

module.exports = router
