const Update = require('../models/Update')

exports.createNewUpdate = async update => {
  const newUpdate = new Update({
    ...update,
    date: Date.now()
  })
  const savedUpdate = await newUpdate.save()
  return savedUpdate
}
