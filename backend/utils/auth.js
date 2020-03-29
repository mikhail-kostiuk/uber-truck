const jwt = require('jsonwebtoken');
const config = require('config');

function createJwtToken(user, role) {
  const payload = {id: user.id, name: user.name, role};

  const token = jwt.sign(payload, config.get('secret'));

  return token;
}

function getUser(req) {
  if (req.headers['authorization']) {
    const [, token] = req.headers['authorization'].split(' ');

    const user = jwt.verify(token, config.get('secret'));

    return user;
  }
}

module.exports = {createJwtToken, getUser};
