const { uuid } = require('uuidv4')

const headerName = 'x-request-uuid'

/**
 * Function to add a request id to each request and set it on the response
 */
module.exports = function(req, res, next) {
  req.id = req.headers[headerName] || uuid()

  res.setHeader(headerName, req.id)

  next()
}
