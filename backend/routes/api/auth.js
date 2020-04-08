const express = require('express');
const User = require('../../models/User');
const {createJwtToken} = require('../../utils/auth');
const schemas = require('../../joi/auth');
const {validateReq} = require('../middleware/validation');

const router = new express.Router();

router.post(
  '/register',
  validateReq(schemas.register, 'body'),
  async (req, res) => {
    console.log(req);

    const {username, password, role} = req.body;

    try {
      const userDoc = await User.findByUsername(username);

      if (userDoc) {
        return res.status(409).json({error: 'UserAlreadyExists'});
      }

      await User.createUser(username, password, role);

      return res.status(200).json({status: 'User registered successfully'});
    } catch (err) {
      console.log(err);

      return res.status(500).json({error: err.message});
    }
  },
);

router.post('/login', validateReq(schemas.login, 'body'), async (req, res) => {
  console.log(req);

  const {username, password} = req.body;

  try {
    const userDoc = await User.findByUsername(username);

    if (!userDoc) {
      return res.status(404).json({error: 'UserNotFound'});
    }

    if (!(await userDoc.verifyPassword(password))) {
      return res.status(401).json({error: `WrongPassword`});
    }

    const token = createJwtToken(userDoc);

    return res
      .status(200)
      .json({status: 'User authenticated successfully', token});
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
});

router.get('/me', async (req, res) => {
  console.log(req);

  const {user} = req;

  if (!user) {
    return res.status(401).json({error: 'UnauthorizedAccess'});
  }

  try {
    const userDoc = await User.findById(user.id);
    return res.status(200).json({
      id: userDoc.id,
      username: userDoc.username,
      role: user.role,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({error: err.message});
  }
});

router.patch(
  '/password',
  validateReq(schemas.changePassword, 'body'),
  async (req, res) => {
    console.log(req);

    const {user} = req;
    const {password, newPassword, confirmNewPassword} = req.body;

    if (!user) {
      return res.status(401).json({error: 'UnauthorizedAccess'});
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({error: 'PasswordsDontMatch'});
    }

    try {
      const userDoc = await User.findById(user.id);

      if (!userDoc) {
        return res.status(404).json({error: 'UserNotFound'});
      }

      if (!(await userDoc.verifyPassword(password))) {
        return res.status(400).json({error: `WrongOldPassword`});
      }

      await userDoc.changePassword(newPassword);

      return res.status(200).json({status: 'Password changed successfully'});
    } catch (err) {
      console.log(err);

      return res.status(500).json({error: err.message});
    }
  },
);

router.delete('/', async (req, res) => {
  console.log(req);

  const {user} = req;

  if (!user) {
    return res.status(401).json({error: 'UnauthorizedAccess'});
  }

  try {
    const userDoc = await User.findById(user.id);

    if (!userDoc) {
      return res.status(404).json({error: 'UserNotFound'});
    }

    if (userDoc.role !== 'shipper') {
      return res.status(403).json({error: 'ForbiddenAction'});
    }

    await userDoc.deleteOne({id: user.id});

    return res.status(200).json({status: 'Account deleted successfully'});
  } catch (err) {
    console.log(err);

    return res.status(500).json({error: err.message});
  }
});

module.exports = router;
