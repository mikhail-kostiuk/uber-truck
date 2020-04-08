const express = require('express');
const User = require('../../models/User');
const Truck = require('../../models/Truck');
const schemas = require('../../joi/trucks');
const {validateReq} = require('../middleware/validation');

const router = new express.Router();

router.post('/', validateReq(schemas.create, 'body'), async (req, res) => {
  console.log(req);

  try {
    const {user} = req;
    const {type} = req.body;

    if (!user) {
      return res.status(401).json({error: 'UnauthorizedAccess'});
    }

    const userDoc = await User.findById(user.id);

    if (!userDoc) {
      return res.status(404).json({error: 'UserNotFound'});
    }

    if (userDoc.role !== 'driver') {
      return res.status(403).json({error: 'ForbiddenAction'});
    }

    await Truck.createTruck(user.id, type);

    return res.status(200).json({status: 'Truck created successfully'});
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

    if (userDoc.role !== 'driver') {
      return res.status(401).json({error: 'UnauthorizedAccess'});
    }

    const trucks = await userDoc.getCreatedTrucks();

    return res.status(200).json({status: 'Success', trucks});
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
});

router.patch('/:id/assign', async (req, res) => {
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
      return res.status(403).json({error: 'ForbiddenAction'});
    }

    const truckDoc = await Truck.findById(id);

    if (!truckDoc) {
      return res.status(404).json({error: 'TruckNotFound'});
    }

    if (truckDoc.createdBy !== userDoc.id) {
      return res.status(403).json({error: 'ForbiddenAction'});
    }

    if (truckDoc.assignedTo === userDoc.id) {
      return res.status(409).json({error: 'AlreadyAssigned'});
    }

    await Truck.assignTo(truckDoc.id, userDoc.id);

    return res.status(200).json({status: 'Truck assigned successfully'});
  } catch (err) {
    console.log(err);

    return res.status(500).json({error: err.message});
  }
});

router.patch('/:id/assign', async (req, res) => {
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
      return res.status(403).json({error: 'ForbiddenAction'});
    }

    const truckDoc = await Truck.findById(id);

    if (!truckDoc) {
      return res.status(404).json({error: 'TruckNotFound'});
    }

    if (truckDoc.createdBy !== userDoc.id) {
      return res.status(403).json({error: 'ForbiddenAction'});
    }

    if (truckDoc.assignedTo === userDoc.id) {
      return res.status(409).json({error: 'AlreadyAssigned'});
    }

    await Truck.assignTo(truckDoc.id, userDoc.id);

    return res.status(200).json({status: 'Truck assigned successfully'});
  } catch (err) {
    console.log(err);

    return res.status(500).json({error: err.message});
  }
});

router.patch(
  '/:id/update',
  validateReq(schemas.update, 'body'),
  async (req, res) => {
    console.log(req);

    const {user} = req;
    const {type} = req.body;
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
        return res.status(403).json({error: 'ForbiddenAction'});
      }

      const truckDoc = await Truck.findById(id);

      if (!truckDoc) {
        return res.status(404).json({error: 'TruckNotFound'});
      }

      if (truckDoc.createdBy !== userDoc.id) {
        return res.status(403).json({error: 'ForbiddenAction'});
      }

      if (truckDoc.assignedTo !== '') {
        return res.status(409).json({error: 'TruckInUse'});
      }

      await truckDoc.updateOne({type});

      return res.status(200).json({status: 'Truck updated successfully'});
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

  if (!user) {
    return res.status(401).json({error: 'UnauthorizedAccess'});
  }

  try {
    const userDoc = await User.findById(user.id);

    if (!userDoc) {
      return res.status(404).json({error: 'UserNotFound'});
    }

    if (userDoc.role !== 'driver') {
      return res.status(403).json({error: 'ForbiddenAction'});
    }

    const truckDoc = await Truck.findById(id);

    if (!truckDoc) {
      return res.status(404).json({error: 'TruckNotFound'});
    }

    if (truckDoc.createdBy !== userDoc.id) {
      return res.status(403).json({error: 'ForbiddenAction'});
    }

    if (truckDoc.assignedTo !== '') {
      return res.status(409).json({error: 'TruckInUse'});
    }

    await truckDoc.deleteOne({id});

    return res.status(200).json({status: 'Truck deleted successfully'});
  } catch (err) {
    console.log(err);

    return res.status(500).json({error: err.message});
  }
});

router.delete('/:id', async (req, res) => {
  console.log(req);

  const {user} = req;
  const id = req.params.id;

  if (!user || user.role !== 'Driver') {
    return res.status(403).json({error: 'Unauthorized access'});
  }

  try {
    const driverDoc = await Driver.findById(user.id);

    if (!driverDoc) {
      return res.status(500).json({error: 'Driver not found'});
    }

    const truckDoc = await Truck.findById(id);

    if (!truckDoc) {
      return res.status(500).json({error: 'Truck not found'});
    }

    if (truckDoc.createdBy !== driverDoc.id) {
      return res.status(403).json({error: 'Unauthorized access'});
    }

    if (truckDoc.assignedTo === driverDoc.id) {
      return res.status(500).json({error: `Can't delete assigned truck`});
    }

    await truckDoc.deleteOne({id});

    return res.status(200).json({message: 'Truck has been deleted'});
  } catch (err) {
    console.log(err);

    return res.status(500).json({error: err.message});
  }
});

module.exports = router;
