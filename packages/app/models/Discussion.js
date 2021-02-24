const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DiscussionSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }], // list of comment ids added to this discussion
  likes: [{ type: Schema.Types.ObjectId, ref: 'users' }], // list of users who liked this discussion
  type: { type: String, required: true }
})

DiscussionSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('discussion', DiscussionSchema)
