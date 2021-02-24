const { oneDay, oneMinute } = require('./constants')

module.exports = {
  inviteCacheOptions: {
    max: 10000,
    length: function(n, key) {
      return n * 2 + key.length
    },
    dispose: function(key, n) {
      n = ''
    },
    maxAge: 2 * oneDay * 1000
  },
  resetPasswordCacheOptions: {
    max: 10000,
    length: function(n, key) {
      return n * 2 + key.length
    },
    dispose: function(key, n) {
      n = ''
    },
    maxAge: 15 * oneMinute * 1000
  }
}
