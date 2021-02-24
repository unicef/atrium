'use strict'

/**
 * Send error message in format understandable by frontend's errorReducer
 */
exports.sendError = (res, status, errorMessage, extraResponseAttributes) => {
  return res.status(status).json({
    ...extraResponseAttributes,
    err: errorMessage
  })
}

/**
 * Get Authenticated Request Log Details
 * From a request, take the requestId and userID and form a object to be received by the logger
 * If any extra information is provided, it will be included in the object
 */
exports.getAuthenticatedRequestLogDetails = (req, extraInformation) => {
  const details = {
    requestId: req.id
  }

  if (req.user) {
    details.user = req.user.id
  }

  if (extraInformation) {
    Object.assign(details, extraInformation)
  }

  return details
}
