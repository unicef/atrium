const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  name: { type: String },
  surname: { type: String },
  avatar: { type: String },
  email: { type: String, required: true },
  password: { type: String },
  date: { type: Date, default: Date.now },
  company: { type: String },
  role: { type: String },
  address: { type: String },
  wallet: { type: Object },
  twitterHandle: { type: String },
  githubUsername: { type: String },
  emailVerified: { type: Boolean },
  emailHash: { type: String },
  learnPageFlag: { type: Boolean, default: false },
  explorePageFlag: { type: Boolean, default: false },
  engagePageFlag: { type: Boolean, default: false },
  acceptsEmail: { type: Boolean, default: false },

  bio: { type: String },
  projects: [{ type: Schema.Types.ObjectId, ref: 'projects' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'discussions' }],
  bookmarks: [{ type: Schema.Types.ObjectId }],
  websites: [{ type: String }],
  // notifications
  commentOnPost: { type: Boolean, default: false },
  commentOnProject: { type: Boolean, default: false },
  repliesOnComments: { type: Boolean, default: false },
  updatesOnPost: { type: Boolean, default: false },
  updatesOnProject: { type: Boolean, default: false },
  updatesOnComments: { type: Boolean, default: false }
})

UserSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('users', UserSchema)
