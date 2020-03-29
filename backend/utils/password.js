const bcrypt = require('bcryptjs');

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt();

  return await bcrypt.hash(password, salt);
}

async function comparePasswords(password, encryptedPassword) {
  return await bcrypt.compare(password, encryptedPassword);
}

module.exports = {encryptPassword, comparePasswords};
