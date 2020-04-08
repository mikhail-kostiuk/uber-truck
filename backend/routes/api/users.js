const express = require('express');
const Driver = require('../../models/Driver');
const Shipper = require('../../models/Shipper');
const {createJwtToken} = require('../../utils/auth');
const schemas = require('../../joi/users');
const {validateReq} = require('../middleware/validation');

const router = new express.Router();

router.post(
  '/register',
  validateReq(schemas.register, 'body'),
  async (req, res) => {
    console.log(req);

    try {
      const {name, email, password, confirmPassword, role} = req.body;

      if (password !== confirmPassword) {
        return res.status(400).json({error: `Passwords don't match`});
      }

      let userDoc = null;

      if (role === 'Driver') {
        userDoc = await Driver.findByEmail(email);
      } else {
        userDoc = await Shipper.findByEmail(email);
      }

      if (userDoc) {
        return res.status(400).json({error: 'User already exists'});
      } else {
        let createdUserDoc = null;

        if (role === 'Driver') {
          createdUserDoc = await Driver.createDriver(name, email, password);
        } else {
          createdUserDoc = await Shipper.createShipper(name, email, password);
        }

        const token = createJwtToken(createdUserDoc, role);

        return res.status(200).json({token});
      }
    } catch (err) {
      console.log(err);

      return res.status(500).json({error: err, message: err.message});
    }
  },
);

router.post('/login', validateReq(schemas.login, 'body'), async (req, res) => {
  console.log(req.body);

  try {
    const {email, password, role} = req.body;

    let userDoc = null;

    if (role === 'Driver') {
      userDoc = await Driver.findByEmail(email);
    } else {
      userDoc = await Shipper.findByEmail(email);
    }

    if (!userDoc) {
      return res.status(400).json({error: `User doesn't exist`});
    }

    if (!(await userDoc.verifyPassword(password))) {
      return res.status(400).json({error: `Wrong password`});
    }

    const token = createJwtToken(userDoc, role);

    return res.status(200).json({token});
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
});

router.get('/me', async (req, res) => {
  console.log(req);

  const {user} = req;

  if (!user) {
    return res.status(403).json({error: 'Unauthorized access'});
  }

  try {
    if (user.role === 'Driver') {
      const userDoc = await Driver.findById(user.id);
      return res.status(200).json({
        id: userDoc.id,
        name: userDoc.name,
        email: userDoc.email,
        role: user.role,
      });
    } else {
      const userDoc = await Shipper.findById(user.id);
      return res.status(200).json({
        id: userDoc.id,
        name: userDoc.name,
        email: userDoc.email,
        role: user.role,
      });
    }
  } catch (err) {
    console.log(err);

    return res.status(500).json({error: err.message});
  }
});

router.put(
  '/password',
  validateReq(schemas.changePassword, 'body'),
  async (req, res) => {
    console.log(req);

    try {
      if (error) {
        return res.status(400).json({error: error.details[0].message});
      }

      const {user} = req;
      const {password, newPassword, confirmNewPassword} = req.body;

      if (!user) {
        return res.status(403).json({error: 'Unauthorized access'});
      }

      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({error: `Passwords don't match`});
      }

      let userDoc = null;

      if (user.role === 'Driver') {
        userDoc = await Driver.findById(user.id);
      } else {
        userDoc = await Shipper.findById(user.id);
      }

      if (!(await userDoc.verifyPassword(password))) {
        return res.status(400).json({error: `Wrong old password`});
      }

      await userDoc.changePassword(newPassword);

      return res.status(200).json({message: 'Password has been changed'});
    } catch (err) {
      console.log(err);

      return res.status(500).json({error: err.message});
    }
  },
);

router.delete('/:id', async (req, res) => {
  console.log(req);

  const {user} = req;
  const id = req.params.id;

  try {
    if (!user) {
      return res.status(403).json({error: 'Unauthorized access'});
    }

    if (user.role !== 'Shipper' || user.id !== id) {
      return res.status(403).json({error: 'Unauthorized access'});
    }

    const shipperDoc = await Shipper.findById(id);

    if (!shipperDoc) {
      return res.status(500).json({error: 'Shipper not found'});
    }

    if (shipperDoc.id) await shipperDoc.deleteOne({id: user.id});

    return res.status(200).json({message: 'Account has been deleted'});
  } catch (err) {
    console.log(err);

    return res.status(500).json({error: err.message});
  }
});

module.exports = router;
