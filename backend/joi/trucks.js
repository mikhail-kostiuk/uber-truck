const Joi = require('@hapi/joi');

const schemas = {
  create: Joi.object().keys({
    type: Joi.string()
      .valid('SPRINTER', 'SMALL STRAIGHT', 'LARGE STRAIGHT')
      .required(),
  }),
  update: Joi.object().keys({
    type: Joi.string()
      .valid('SPRINTER', 'SMALL STRAIGHT', 'LARGE STRAIGHT')
      .required(),
  }),
};

module.exports = schemas;
