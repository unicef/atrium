const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UpdateSchema = new Schema({
  text: { type: String, required: true }, // update text
  title: { type: String, required: true }, // update title
  owner: { type: Schema.Types.ObjectId, ref: 'users' }, // user who uploaded the update
  date: {
    type: Date,
    default: Date.now
  }
})

UpdateSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('updates', UpdateSchema)
