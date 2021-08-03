const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { BADGE_ENUM } = require('../config/unin-constants')
const keys = require('../config/keys')
const badges = require('./badges')
const log = require('../config/log')

/**
 * Retrieve badges for specific user
 *
 * @param {string} address
 */
const getBadgesForUser = async address => {
  log.info({ address }, 'getBadgesForUser')
  return await Promise.all([
    badges.hasBadge(BADGE_ENUM.MEMBER, address),
    badges.hasBadge(BADGE_ENUM.CONTRIBUTOR, address),
    badges.hasBadge(BADGE_ENUM.INFLUENCER, address)
    // badges.hasBadge(4, address)
  ])
}

/**
 * Salt and hash password
 * @param {string} password
 */
const saltAndHashPassword = async password => {
  const salt = await bcrypt.genSalt(10)

  return await bcrypt.hash(password, salt)
}

/**
 * Get payload to sign the token with
 *
 * @param {User} user
 * @param {Array<Boolean>} userBadges
 */
const getTokenPayload = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    address: user.address ? user.address : '',
    company: user.company,
    role: user.role,
    githubHandle: user.githubUsername ? user.githubUsername : '',
    twitterHandle: user.twitterHandle ? user.twitterHandle : '',
    learnPageFlag: user.learnPageFlag ? user.learnPageFlag : false,
    explorePageFlag: user.explorePageFlag ? user.explorePageFlag : false,
    engagePageFlag: user.engagePageFlag ? user.engagePageFlag : false,
    bio: user.bio ? user.bio : '',
    projects: user.projects ? user.projects : [''],
    comments: user.comments ? user.comments : [''],
    posts: user.posts ? user.posts : [''],
    bookmarks: user.bookmarks ? user.bookmarks : [''],
    websites: user.websites ? user.websites : [''],
    commentOnPost: user.commentOnPost ? user.commentOnPost : false,
    commentOnProject: user.commentOnProject ? user.commentOnProject : false,
    repliesOnComments: user.repliesOnComments ? user.repliesOnComments : false,
    updatesOnPost: user.updatesOnPost ? user.updatesOnPost : false,
    updatesOnProject: user.updatesOnProject ? user.updatesOnProject : false,
    updatesOnComments: user.updatesOnComments ? user.updatesOnComments : false,
    isAdmin: user.isAdmin ? user.isAdmin : false,
    balance: user.balance ? user.balance : 0,
    badges: user.badges ? user.badges : 0
  }
}

/**
 * Signs a jwt token with 1 year expiry with the secret provided by environment variables
 * Calls a callback with the (token, error)
 *
 * @param {Object} payload
 * @param {Function} cb
 * @param {String} expiration
 */
const signToken = (payload, cb, expiration = '1y') => {
  // Sign token
  jwt.sign(
    payload,
    keys.SECRET_OR_KEY,
    {
      expiresIn: expiration
    },
    cb
  )
}

const verifyToken = token => {
  return jwt.verify(token, keys.SECRET_OR_KEY)
}

/**
 * Get token for specific user and call a callback with error or resulting token
 *
 * @param {User} user
 * @param {(error, token) => void} cb
 */
const getTokenForUser = async (user, cb) => {
  log.info(user, 'get badges for user')
  const userBadges = await getBadgesForUser(user.address)

  const payload = getTokenPayload(user, userBadges)

  const bearerTransform = (error, token) => {
    cb(error, token && `Bearer ${token}`)
  }

  signToken(payload, bearerTransform)
}

module.exports = {
  saltAndHashPassword,
  getBadgesForUser,
  getTokenPayload,
  signToken,
  getTokenForUser,
  verifyToken
}
