const express = require('express');
const Driver = require('../../models/Driver');
const Truck = require('../../models/Truck');
const schemas = require('../../joi/trucks');

const router = new express.Router();

router.post('/', async (req, res) => {
  // console.log(req);

  try {
    const {error} = await schemas.add.validateAsync(req.body);

    if (error) {
      return res.status(400).json({error: error.details[0].message});
    }

    const {user} = req;
    const {name, type} = req.body;

    if (!user || user.role !== 'Driver') {
      return res.status(403).json({error: 'Unauthorized access'});
    }

    const driverDoc = await Driver.findById(user.id);

    if (!driverDoc) {
      return res.status(500).json({error: 'Driver not found'});
    }

    const truckDoc = await Truck.findByName(name);

    if (truckDoc) {
      return res.status(500).json({error: 'Truck name already exists'});
    }

    const createdTruckDoc = await Truck.add(name, user.id, type);

    return res.status(200).json(createdTruckDoc);
  } catch (err) {
    // console.log(err);

    return res.status(500).json({error: err.message});
  }
});

router.get('/', async (req, res) => {
  // console.log(req);

  const {user} = req;

  if (!user || user.role !== 'Driver') {
    return res.status(403).json({error: 'Unauthorized access'});
  }

  try {
    const driverDoc = await Driver.findById(user.id);

    if (!driverDoc) {
      return res.status(500).json({error: 'Driver not found'});
    }

    const createdTrucksDocs = await driverDoc.getCreatedTrucks();

    return res.status(200).json(createdTrucksDocs);
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
});

router.patch('/:truckId', async (req, res) => {
  // console.log(req);

  const {user} = req;
  const truckId = req.params.truckId;

  if (!user || user.role !== 'Driver') {
    return res.status(403).json({error: 'Unauthorized access'});
  }

  try {
    const driverDoc = await Driver.findById(user.id);

    if (!driverDoc) {
      return res.status(500).json({error: 'Driver not found'});
    }

    const truckDoc = await Truck.findById(truckId);

    if (!truckDoc) {
      return res.status(500).json({error: 'Truck not found'});
    }

    if (truckDoc.createdBy !== driverDoc.id) {
      return res.status(403).json({error: 'Unauthorized access'});
    }

    if (truckDoc.assignedTo === driverDoc.id) {
      return res.status(500).json({error: 'Truck already assigned'});
    }

    const assignedTruckDoc = await truckDoc.assignTo(user.id);

    return res.status(200).json(assignedTruckDoc);
  } catch (err) {
    // console.log(err);

    return res.status(500).json({error: err.message});
  }
});

router.put('/:truckId', async (req, res) => {
  // console.log(req);

  try {
    const {error} = await schemas.update.validateAsync(req.body);

    if (error) {
      return res.status(400).json({error: error.details[0].message});
    }

    const {user} = req;
    const truckId = req.params.truckId;
    const {name, status, type} = req.body;

    if (!user || user.role !== 'Driver') {
      return res.status(403).json({error: 'Unauthorized access'});
    }

    const driverDoc = await Driver.findById(user.id);

    if (!driverDoc) {
      return res.status(500).json({error: 'Driver not found'});
    }

    const truckDoc = await Truck.findById(truckId);

    if (!truckDoc) {
      return res.status(500).json({error: 'Truck not found'});
    }

    if (truckDoc.createdBy !== driverDoc.id) {
      return res.status(403).json({error: 'Unauthorized access'});
    }

    if (truckDoc.assignedTo === driverDoc.id) {
      return res.status(500).json({error: `Can't modify assigned truck`});
    }

    const modifiedTruckDoc = await truckDoc.updateOne({name, status, type});

    return res.status(200).json(modifiedTruckDoc);
  } catch (err) {
    // console.log(err);

    return res.status(500).json({error: err.message});
  }
});

module.exports = router;
