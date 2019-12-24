'use strict'

const Joi = require('joi')

// User validation rules
module.exports = {
  create: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      firstName: Joi.string().max(128).required(),
      lastName: Joi.string().max(128).required(),
    }
  }
}
