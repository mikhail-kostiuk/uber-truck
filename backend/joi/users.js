const Joi = require('@hapi/joi');

const schemas = {
  register: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
    role: Joi.string().valid('Driver', 'Shipper').required(),
  }),
  login: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('Driver', 'Shipper').required(),
  }),
};

module.exports = schemas;
