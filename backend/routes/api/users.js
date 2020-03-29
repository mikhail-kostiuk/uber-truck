const express = require('express');
const Driver = require('../../models/Driver');
const Shipper = require('../../models/Shipper');
const {createJwtToken} = require('../../utils/auth');
const schemas = require('../../joi/users');

const router = new express.Router();

router.post('/register', async (req, res) => {
  // console.log(req);

  try {
    const {error} = await schemas.register.validateAsync(req.body);

    if (error) {
      return res.status(400).json({error: error.details[0].message});
    }

    const {name, email, password, confirmPassword, role} = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({error: `Passwords don't match`});
    }

    let user = null;

    if (role === 'Driver') {
      user = await Driver.findByEmail(email);
    } else {
      user = await Shipper.findByEmail(email);
    }

    if (user) {
      return res.status(400).json({error: 'User already exists'});
    } else {
      let createdUser = null;

      if (role === 'Driver') {
        createdUser = await Driver.add(name, email, password);
      } else {
        createdUser = await Shipper.add(name, email, password);
      }

      return res.status(200).json(createdUser);
    }
  } catch (err) {
    // console.log(err);

    return res.status(500).json({error: err.message});
  }
});

router.post('/login', async (req, res) => {
  // console.log(req);

  try {
    const {error} = await schemas.login.validateAsync(req.body);

    if (error) {
      return res.status(400).json({error: error.details[0].message});
    }

    const {email, password, role} = req.body;

    let user = null;

    if (role === 'Driver') {
      user = await Driver.findByEmail(email);
    } else {
      user = await Shipper.findByEmail(email);
    }

    if (!user) {
      return res.status(400).json({error: `User doesn't exist`});
    }

    if (!(await user.verifyPassword(password))) {
      return res.status(400).json({error: `Wrong password`});
    }

    const token = createJwtToken(user, role);

    return res.status(200).json({token});
  } catch (err) {
    // console.log(err);

    return res.status(500).json({error: err.message});
  }
});

router.get('/me', async (req, res) => {
  // console.log(req);
  const {user} = req;

  if (!user) {
    return res.status(403).json({error: 'Unauthorized access'});
  }

  try {
    if (user.role === 'Driver') {
      const driver = await Driver.findById(user.id);
      return res
        .status(200)
        .json({
          id: driver.id,
          name: driver.name,
          email: driver.email,
          role: user.role,
        });
    } else {
      const shipper = await Shipper.findById(user.id);
      return res
        .status(200)
        .json({
          id: shipper.id,
          name: shipper.name,
          email: shipper.email,
          role: user.role,
        });
    }
  } catch (err) {
    // console.log(err);

    return res.status(500).json({error: err.message});
  }
});

module.exports = router;
