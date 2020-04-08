const validateReq = (schema, property) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req[property]);
      next();
    } catch (err) {
      return res.status(400).json({error: err.details[0].message});
    }
  };
};

module.exports = {validateReq};
