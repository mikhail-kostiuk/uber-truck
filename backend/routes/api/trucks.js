const express = require('express');
const Driver = require('../../models/Driver');
const Truck = require('../../models/Truck');
const schemas = require('../../joi/trucks');
const {validateReq} = require('../middleware/validation');

const router = new express.Router();

router.post('/', validateReq(schemas.create, 'body'), async (req, res) => {
  console.log(req);

  try {
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

    const createdTruckDoc = await Truck.createTruck(name, user.id, type);

    return res.status(200).json(createdTruckDoc);
  } catch (err) {
    console.log(err);

    return res.status(500).json({error: err.message});
  }
});

router.get('/', async (req, res) => {
  console.log(req);

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
  console.log(req);

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

    await truckDoc.assignTo(user.id);

    return res.status(200).json({message: 'Truck has been assigned'});
  } catch (err) {
    console.log(err);

    return res.status(500).json({error: err.message});
  }
});

router.put('/:id', validateReq(schemas.update, 'body'), async (req, res) => {
  console.log(req);

  try {
    const {user} = req;
    const id = req.params.id;
    const {name, status, type} = req.body;

    if (!user || user.role !== 'Driver') {
      return res.status(403).json({error: 'Unauthorized access'});
    }

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
      return res.status(500).json({error: `Can't modify assigned truck`});
    }

    await truckDoc.updateOne({name, status, type});

    return res.status(200).json({message: 'Truck has been updated'});
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
