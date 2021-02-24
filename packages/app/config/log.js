const bunyan = require('bunyan')

// create log configuration
const log = bunyan.createLogger({
  name: 'interagency-blockchain-app',
  level: process.env.LOGGER_LEVEL || 'trace'
  // TODO: add remote logging or logging to file based on deploy
})

module.exports = {
  trace: (...args) => log.trace(...args),
  debug: (...args) => log.debug(...args),
  info: (...args) => log.info(...args),
  warn: (...args) => log.warn(...args),
  error: (...args) => log.error(...args),
  fatal: (...args) => log.fatal(...args)
}
