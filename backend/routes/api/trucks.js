const express = require('express');
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

    const createdTruckDoc = await Truck.add({name, driverId: user.id, type});

    return res.status(200).json(createdTruckDoc);
  } catch (err) {
    // console.log(err);

    return res.status(500).json({error: err.message});
  }
});

router.put('/:truckId', async (req, res) => {
  // console.log(req);

  try {
    const {user} = req;
    const truckId = req.params.truckId;

    if (!user || user.role !== 'Driver') {
      return res.status(403).json({error: 'Unauthorized access'});
    }

    await Truck.assign({driverId: user.id, truckId});

    return res.status(200).json({message: 'Truck has been assigned'});
  } catch (err) {
    // console.log(err);

    return res.status(500).json({error: err.message});
  }
});

module.exports = router;
