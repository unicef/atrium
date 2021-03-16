const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DeploymentFilesSchema = new Schema({
  name: { type: String, required: true },
  content: { type: Buffer, required: true }
})

module.exports = mongoose.model('deploymentFiles', DeploymentFilesSchema)
