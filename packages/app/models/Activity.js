const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ActivitySchema = new Schema({
  typeOfActivity: { type: String, required: true }, // type of activity logged
  project: { type: Schema.Types.ObjectId, ref: 'projects' }, // project referenced in activity [optional]
  poll: { type: Schema.Types.ObjectId, ref: 'polls' }, // poll referenced in activity [optional]
  learningResource: { type: Schema.Types.ObjectId, ref: 'learningResources' }, // learning resource referenced in activity [optional]
  discussion: { type: Schema.Types.ObjectId, ref: 'discussion' },
  badgeIssued: { type: Number }, // badge issued [optional]
  createdAt: { type: Date, required: true, default: Date.now() }, // date of activity
  user: { type: Schema.Types.ObjectId, ref: 'users' } // user that made the activity
})

ActivitySchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('activities', ActivitySchema)
