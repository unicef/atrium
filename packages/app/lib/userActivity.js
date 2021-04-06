'use-strict'
const { ACTIVITY_ENUM } = require('../config/unin-constants')
const ActivityModel = require('../models/Activity')
const log = require('../config/log')

const logActivity = async activity => {
  return await new ActivityModel({
    ...activity,
    createdAt: Date.now()
  }).save()
}

const logJoiningAtrium = async userId => {
  log.info({ user: userId }, 'Logging user joined activity')
  return await logActivity({
    typeOfActivity: ACTIVITY_ENUM.JOIN_ATRIUM,
    user: userId
  })
}

const logProjectCreation = async (userId, projectId) => {
  log.info(
    { user: userId, project: projectId },
    'Logging project created activity'
  )
  return await logActivity({
    typeOfActivity: ACTIVITY_ENUM.CREATE_PROJECT,
    user: userId,
    project: projectId
  })
}

const logProjectComment = async (userId, projectId) => {
  log.info(
    { user: userId, project: projectId },
    'Logging project commented activity'
  )
  return await logActivity({
    typeOfActivity: ACTIVITY_ENUM.COMMENT_PROJECT,
    user: userId,
    project: projectId
  })
}

const logProjectUpdate = async (userId, projectId) => {
  log.info(
    { user: userId, project: projectId },
    'Logging project added update activity'
  )
  return await logActivity({
    typeOfActivity: ACTIVITY_ENUM.COMMENT_PROJECT,
    user: userId,
    project: projectId
  })
}

const logProjectLike = async (userId, projectId) => {
  log.info(
    { user: userId, project: projectId },
    'Logging project created activity'
  )
  return await logActivity({
    typeOfActivity: ACTIVITY_ENUM.LIKE_PROJECT,
    user: userId,
    project: projectId
  })
}

const logPollCreation = async (userId, pollId) => {
  log.info({ user: userId, poll: pollId }, 'Logging poll created activity')
  return await logActivity({
    typeOfActivity: ACTIVITY_ENUM.CREATE_POLL,
    user: userId,
    poll: pollId
  })
}

const logPollAnswer = async (userId, pollId) => {
  log.info({ user: userId, poll: pollId }, 'Logging poll answered activity')
  return await logActivity({
    typeOfActivity: ACTIVITY_ENUM.ANSWER_POLL,
    user: userId,
    poll: pollId
  })
}

const logIssueBadge = async (userId, badge) => {
  log.info({ user: userId, badge }, 'Logging badge issued')
  return await logActivity({
    typeOfActivity: ACTIVITY_ENUM.ISSUE_BADGE,
    user: userId,
    badgeIssued: badge
  })
}

const logLearningResourceUpload = async (userId, resourceId) => {
  log.info(
    { user: userId, resource: resourceId },
    'Logging resource upload activity'
  )
  return await logActivity({
    typeOfActivity: ACTIVITY_ENUM.UPLOAD_LEARNING_RESOURCE,
    user: userId,
    learningResource: resourceId
  })
}

const logLearningResourceComment = async (userId, resourceId) => {
  log.info(
    { user: userId, resource: resourceId },
    'Logging resource commented activity'
  )
  return await logActivity({
    typeOfActivity: ACTIVITY_ENUM.COMMENT_LEARNING_RESOURCE,
    user: userId,
    learningResource: resourceId
  })
}

const logLearningResourceLike = async (userId, resourceId) => {
  log.info(
    { user: userId, resource: resourceId },
    'Logging resource liked activity'
  )
  return await logActivity({
    typeOfActivity: ACTIVITY_ENUM.LIKE_LEARNING_RESOURCE,
    user: userId,
    learningResource: resourceId
  })
}

const logCreateDiscussion = async (userId, discussionId) => {
  log.info(
    { user: userId, discussion: discussionId },
    'Logging discussion created activity'
  )

  return await logActivity({
    typeOfActivity: ACTIVITY_ENUM.CREATE_DISCUSSION,
    user: userId,
    discussion: discussionId
  })
}

const logParticipateInDiscussion = async (userId, discussionId) => {
  log.info(
    { user: userId, discussion: discussionId },
    'Logging participation in discussion activity'
  )

  return await logActivity({
    typeOfActivity: ACTIVITY_ENUM.PARTICIPATE_DISCUSSION,
    user: userId,
    discussion: discussionId
  })
}

const logLikeDiscussion = async (userId, discussionId) => {
  log.info(
    { user: userId, discussion: discussionId },
    'Logging like in discussion activity'
  )

  return await logActivity({
    typeOfActivity: ACTIVITY_ENUM.LIKE_DISCUSSION,
    user: userId,
    discussion: discussionId
  })
}

module.exports = {
  logActivity,
  logJoiningAtrium,
  logProjectCreation,
  logProjectComment,
  logProjectUpdate,
  logProjectLike,
  logPollCreation,
  logPollAnswer,
  logIssueBadge,
  logLearningResourceUpload,
  logLearningResourceComment,
  logLearningResourceLike,
  logCreateDiscussion,
  logParticipateInDiscussion,
  logLikeDiscussion
}
