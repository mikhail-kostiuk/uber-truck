const Joi = require('@hapi/joi');

const schemas = {
  create: Joi.object().keys({
    payload: Joi.number().required(),
    dimensions: Joi.object().keys({
      length: Joi.number().required(),
      width: Joi.number().required(),
      height: Joi.number().required(),
    }),
  }),
  update: Joi.object().keys({
    name: Joi.string().required(),
    width: Joi.number().required(),
    length: Joi.number().required(),
    height: Joi.number().required(),
    payload: Joi.number().required(),
  }),
};

module.exports = schemas;
