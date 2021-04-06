const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String
    // required: true
  },
  surname: {
    type: String
    // required: true
  },
  avatar: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
    // required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  company: {
    type: String
  },
  role: {
    type: String
  },
  address: {
    type: String
  },
  wallet: {
    type: Object
    // required: true
  },
  twitterHandle: {
    type: String
  },
  githubUsername: {
    type: String
  },
  emailVerified: {
    type: Boolean
  },
  emailHash: {
    type: String
  },
  learnPageFlag: {
    type: Boolean,
    default: false
  },
  explorePageFlag: {
    type: Boolean,
    default: false
  },
  engagePageFlag: {
    type: Boolean,
    default: false
  },
  acceptsEmail: {
    type: Boolean,
    default: false
  }
})

UserSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('users', UserSchema)
