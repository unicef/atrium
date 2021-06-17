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

  bio: { type: String, default: '' },
  projects: [{ type: Schema.Types.ObjectId, ref: 'projects', default: [] }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'comments', default: [] }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'discussions', default: [] }],
  bookmarks: [{ type: Schema.Types.ObjectId, default: [] }],
  websites: [{ type: String, default: [] }],
  // notifications
  commentOnPost: { type: Boolean, default: false },
  commentOnProject: { type: Boolean, default: false },
  repliesOnComments: { type: Boolean, default: false },
  updatesOnPost: { type: Boolean, default: false },
  updatesOnProject: { type: Boolean, default: false },
  updatesOnComments: { type: Boolean, default: false },
  // registration validation
  registrationCompleted: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  balance: { type: Number, default: 0 },
  badges: { type: Number, default: 0 },
  firstProject: { type: Boolean, default: true }
})

UserSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('users', UserSchema)
