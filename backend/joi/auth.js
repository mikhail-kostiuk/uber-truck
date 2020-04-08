const Joi = require('@hapi/joi');

const schemas = {
  register: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string()
      .valid('driver', 'Driver', 'shipper', 'Shipper')
      .required(),
  }),
  login: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
  changePassword: Joi.object().keys({
    password: Joi.string().required(),
    newPassword: Joi.string().required(),
    confirmNewPassword: Joi.string().required(),
  }),
};

module.exports = schemas;
