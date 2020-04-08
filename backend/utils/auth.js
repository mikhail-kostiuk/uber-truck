const jwt = require('jsonwebtoken');
const config = require('config');

function createJwtToken(user) {
  const {id, username, role} = user;

  const token = jwt.sign({id, username, role}, config.get('secret'));

  return token;
}

function getUser(req) {
  if (req.headers['authorization']) {
    const token = req.headers['authorization'];

    const user = jwt.verify(token, config.get('secret'));

    return user;
  }
}

module.exports = {createJwtToken, getUser};
