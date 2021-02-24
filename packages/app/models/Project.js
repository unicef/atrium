const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  name: { type: String, required: true }, // project name
  details: { type: String, required: true }, // project description
  owner: { type: Schema.Types.ObjectId, ref: 'users' }, // user who uploaded the project on atrium
  projectOwner: { type: String }, // project owner name
  projectOwnerEmail: { type: String }, // project owner email
  email: { type: String },
  tags: { type: [String] }, // this will be descriptors for the repo
  linkToRepository: { type: String }, // github url of the project (required)
  websiteLink: { type: String },
  createdAt: { type: Date, required: true }, // date will be created when the project is saved,
  linkToDeployedApp: { type: String }, // deployed version of the app (optional)
  comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }], // list of comment ids added to this project
  likes: [{ type: Schema.Types.ObjectId, ref: 'users' }], // list of users who liked this project
  attachment: { type: String }
})

ProjectSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('projects', ProjectSchema)
