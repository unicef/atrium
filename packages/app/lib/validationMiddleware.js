const log = require('../config/log')
const { sendError } = require('./requestUtils')

const middleware = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)
    const valid = error === undefined

    if (valid) {
      return next()
    } else {
      log.info({
        requestId: req.id,
        userId: req.user && req.user.id,
        error
      })
      const detailMessages = { ...error.details.map(detail => detail.message) }
      return sendError(res, 400, 'Bad request', detailMessages)
    }
  }
}
module.exports = middleware
