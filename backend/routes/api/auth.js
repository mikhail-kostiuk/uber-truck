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

/**
 * @api {get} /api/users/me Get user's profile
 * @apiName GetUsersMe
 * @apiGroup Users
 *
 * @apiSuccess {String} id User's id.
 * @apiSuccess {String} username User's username.
 * @apiSuccess {String} role User's role.
 *
 * @apiError (500 Internal Server Error) InternalServerError The server
 *  encountered an internal error
 */
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

/**
 * @api {patch} /api/users/password Change user's password
 * @apiName PatchUsersPassword
 * @apiGroup Users
 *
 * @apiSuccess {String} status Operation status.
 *
 * @apiError (500 Internal Server Error) InternalServerError The server
 *  encountered an internal error
 */
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

/**
 * @api {delete} /api/users Delete user
 * @apiName DeleteUsers
 * @apiGroup Users
 *
 * @apiSuccess {String} status Operation status.
 *
 * @apiError (500 Internal Server Error) InternalServerError The server
 *  encountered an internal error
 */
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
