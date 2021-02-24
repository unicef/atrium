const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LearningResourceSchema = new Schema({
  title: { type: String, required: true }, // learning resource name
  description: { type: String }, // learning resource description
  uploader: { type: Schema.Types.ObjectId, ref: 'users' },
  link: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }], // list of comment ids added to this resource
  likes: [{ type: Schema.Types.ObjectId, ref: 'users' }], // list of users who liked this resource,
  category: { type: String, required: true }
})

module.exports = mongoose.model('learningResources', LearningResourceSchema)
