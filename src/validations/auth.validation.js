const Joi = require('joi')
const { password } = require('./custom.validation')

const register = {
  body: Joi.object().keys({
    accountType: Joi.string().valid('private', 'company').required(),
    offers: Joi.boolean(),
    data: Joi.object().when('accountType', {
      is: 'private',
      then: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
      }),
      otherwise: Joi.object({
        company: Joi.string().required(),
        vat: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        zipcode: Joi.string().required(),
        country: Joi.string().required(),
        state: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
      }),
    }),
  }),
}

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}

module.exports = {
  register,
  login,
}
