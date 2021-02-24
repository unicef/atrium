const Joi = require('@hapi/joi')

const schemas = {
  register: Joi.object({
    name: Joi.string().required(),
    password: Joi.string()
      .min(6)
      .max(30)
      .required(),
    password2: Joi.ref('password'),
    role: Joi.string().optional(),
    company: Joi.string().required(),
    emailHash: Joi.string().required(),
    invitationCode: Joi.string().required()
  }),
  login: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  }),
  forgotPassword: Joi.object({
    email: Joi.string()
      .email()
      .required()
  }),
  resetPassword: Joi.object({
    token: Joi.string().required(),
    password: Joi.string()
    .min(6)
    .max(30)
    .required(),
  }),
  updateUser: Joi.object({
    avatar: Joi.optional(),
    name: Joi.string().required(),
    company: Joi.string().required(),
    role: Joi.string().required()
  }),
  changePassword: Joi.object({
    password: Joi.string()
      .min(6)
      .max(30)
      .required(),
    password2: Joi.ref('password')
  })
}
module.exports = schemas
