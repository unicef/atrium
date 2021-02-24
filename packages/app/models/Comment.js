const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  content: { type: String, required: true },
  mentions: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  date: {
    type: Date,
    default: Date.now
  }
})

CommentSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('comments', CommentSchema)
