const Joi = require('@hapi/joi');

const schemas = {
  create: Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string()
      .valid('SPRINTER', 'SMALL STRAIGHT', 'LARGE STRAIGHT')
      .required(),
  }),
  update: Joi.object().keys({
    name: Joi.string().required(),
    status: Joi.string().valid('IS', 'OL').required(),
    type: Joi.string()
      .valid('SPRINTER', 'SMALL STRAIGHT', 'LARGE STRAIGHT')
      .required(),
  }),
};

module.exports = schemas;
