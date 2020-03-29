const {getUser} = require('../../utils/auth');

module.exports = (req, res, next) => {
  const user = getUser(req);

  if (user) {
    req.user = user;
  }

  next();
};
