const express = require('express');
const Load = require('../../models/Load');
const User = require('../../models/User');
const schemas = require('../../joi/loads');
const {validateReq} = require('../middleware/validation');

const router = new express.Router();

router.post('/', validateReq(schemas.create, 'body'), async (req, res) => {
  console.log(req);

  const {user} = req;
  const {payload, dimensions} = req.body;

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

    await Load.createLoad(user.id, payload, dimensions);

    return res.status(200).json({status: 'Load created successfully'});
  } catch (err) {
    console.log(err);

    return res.status(500).json({error: err.message});
  }
});

router.get('/', async (req, res) => {
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

    let loads = null;

    if (userDoc.role === 'shipper') {
      loads = await userDoc.getCreatedLoads();
    } else {
      loads = await userDoc.getAssignedLoads();
    }

    return res.status(200).json({status: 'Success', loads});
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
});

router.patch('/:id/post', async (req, res) => {
  console.log(req);

  const {user} = req;
  const id = req.params.id;

  if (!user) {
    return res.status(401).json({error: 'UnauthorizedAccess'});
  }

  try {
    const userDoc = await User.findById(user.id);

    if (!userDoc) {
      return res.status(404).json({error: 'UserNotFound'});
    }

    if (userDoc.role !== 'shipper') {
      return res.status(401).json({error: 'UnauthorizedAccess'});
    }

    const loadDoc = await Load.findById(id);

    if (!loadDoc) {
      return res.status(404).json({error: 'LoadNotFound'});
    }

    if (loadDoc.createdBy !== userDoc.id) {
      return res.status(401).json({error: 'UnauthorizedAccess'});
    }

    if (loadDoc.status !== 'NEW') {
      return res.status(409).json({error: `LoadAlreadyPosted`});
    }

    const driver = await loadDoc.post();

    if (driver) {
      res
        .status(200)
        .json({status: 'Load posted successfully', assignedTo: driver});
    }

    return res.status(200).json({status: 'No drivers found'});
  } catch (err) {
    console.log(err);

    return res.status(500).json({error: err.message});
  }
});

router.patch('/:id/state', async (req, res) => {
  console.log(req);

  const {user} = req;
  const id = req.params.id;

  if (!user) {
    return res.status(401).json({error: 'UnauthorizedAccess'});
  }

  try {
    const userDoc = await User.findById(user.id);

    if (!userDoc) {
      return res.status(404).json({error: 'UserNotFound'});
    }

    if (userDoc.role !== 'driver') {
      return res.status(401).json({error: 'UnauthorizedAccess'});
    }

    const loadDoc = await Load.findById(id);

    if (!loadDoc) {
      return res.status(404).json({error: 'LoadNotFound'});
    }

    if (loadDoc.assignedTo !== userDoc.id) {
      return res.status(401).json({error: 'UnauthorizedAccess'});
    }

    const state = await loadDoc.changeState();

    if (state) {
      res.status(200).json({status: 'Load status changed successfully'});
    }

    return res.status(409).json({error: 'AlreadyDelivered'});
  } catch (err) {
    console.log(err);

    return res.status(500).json({error: err.message});
  }
});

module.exports = router;
