const Update = require('../models/Update')
const log = require('../config/log')

exports.createNewUpdate = async update => {
  log.info(
    {
      update: update
    },
    'Creating new update'
  )
  const newUpdate = new Update({
    ...update,
    date: Date.now()
  })
  return await newUpdate.save()
}
