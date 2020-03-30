const Joi = require('@hapi/joi');

const schemas = {
  add: Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string()
      .valid('SPRINTER', 'SMALL STRAIGHT', 'LARGE STRAIGHT')
      .required(),
  }),
};

module.exports = schemas;
