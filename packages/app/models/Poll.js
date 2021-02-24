const mongoose = require('mongoose')
const Schema = mongoose.Schema

function getMonday(d) {
  d = new Date(d)
  var day = d.getDay(),
    diff = d.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is sunday
  return new Date(d.setDate(diff))
}

// Create Schema
const PollSchema = new Schema({
  topic: String,
  choices: [
    {
      value: String,
      votes: Number
    }
  ],
  // Need to add an array of voters as well
  voters: [String],
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  expiryTime: {
    type: Date,
    default: getMonday(Date.now() + 90 * 24 * 60 * 60 * 1000)
  }
})

PollSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('polls', PollSchema)
