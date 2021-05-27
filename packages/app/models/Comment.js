const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  content: { type: String, required: true },
  mentions: [{ type: Schema.Types.ObjectId, ref: 'users', default: [] }],
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  date: {
    type: Date,
    default: Date.now
  },
  replies: [{ type: Schema.Types.ObjectId, ref: 'comments' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'users', default: [] }],
  reported: { type: Boolean, default: false }
})

CommentSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('comments', CommentSchema)
