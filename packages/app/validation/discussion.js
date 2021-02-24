const Joi = require('@hapi/joi')

const schemas = {
  createDiscussion: Joi.object({
    type: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required()
  }),
  commentDiscussion: Joi.object({
    content: Joi.string().required()
  })
}
module.exports = schemas
