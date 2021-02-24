const db = process.env.TESTING
  ? process.env.MONGO_URL
  : require('./keys').MONGO_URI
const mongoose = require('mongoose')
const conn = mongoose.createConnection(db)

mongoose.connect(db, { useNewUrlParser: true, promiseLibrary: global.Promise })

module.exports = {
  conn
}
