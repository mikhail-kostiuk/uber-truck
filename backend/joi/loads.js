const Joi = require('@hapi/joi');

const schemas = {
  add: Joi.object().keys({
    name: Joi.string().required(),
    width: Joi.number().required(),
    length: Joi.number().required(),
    height: Joi.number().required(),
    payload: Joi.number().required(),
  }),
};

module.exports = schemas;
