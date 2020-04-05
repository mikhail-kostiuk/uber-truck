const express = require('express');
const Load = require('../../models/Load');
const Shipper = require('../../models/Shipper');
const schemas = require('../../joi/loads');

const router = new express.Router();

router.post('/', async (req, res) => {
  console.log(req);

  try {
    const {error} = await schemas.add.validateAsync(req.body);

    if (error) {
      return res.status(400).json({error: error.details[0].message});
    }

    const {user} = req;
    const {name, width, length, height, payload} = req.body;

    if (!user || user.role !== 'Shipper') {
      return res.status(403).json({error: 'Unauthorized access'});
    }

    const shipperDoc = await Shipper.findById(user.id);

    if (!shipperDoc) {
      return res.status(500).json({error: 'Shipper not found'});
    }

    const loadDoc = await Load.findByName(name);

    if (loadDoc) {
      return res.status(500).json({error: 'Load name already exists'});
    }

    const createdLoadDoc = await Load.createLoad(
      name,
      user.id,
      width,
      length,
      height,
      payload,
    );

    return res.status(200).json(createdLoadDoc);
  } catch (err) {
    console.log(err);

    return res.status(500).json({error: err.message});
  }
});

router.get('/', async (req, res) => {
  console.log(req);

  const {user} = req;

  if (!user || user.role !== 'Shipper') {
    return res.status(403).json({error: 'Unauthorized access'});
  }

  try {
    const shipperDoc = await Shipper.findById(user.id);

    if (!shipperDoc) {
      return res.status(500).json({error: 'Shipper not found'});
    }

    const createdLoadsDocs = await shipperDoc.getCreatedLoads();

    return res.status(200).json(createdLoadsDocs);
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
});

router.put('/:id', async (req, res) => {
  console.log(req);

  try {
    const {error} = await schemas.update.validateAsync(req.body);

    if (error) {
      return res.status(400).json({error: error.details[0].message});
    }

    const {user} = req;
    const id = req.params.id;
    const {name, width, length, height, payload} = req.body;

    if (!user || user.role !== 'Shipper') {
      return res.status(403).json({error: 'Unauthorized access'});
    }

    const shipperDoc = await Shipper.findById(user.id);

    if (!shipperDoc) {
      return res.status(500).json({error: 'Driver not found'});
    }

    const loadDoc = await Load.findById(id);

    if (!loadDoc) {
      return res.status(500).json({error: 'Load not found'});
    }

    if (loadDoc.createdBy !== user.id) {
      return res.status(403).json({error: 'Unauthorized access'});
    }

    if (loadDoc.status !== 'NEW') {
      return res.status(500).json({error: `Can't modify load in progress`});
    }

    await loadDoc.updateOne({
      name,
      dimensions: {width, length, height},
      payload,
    });

    return res.status(200).json({message: 'Load has been updated'});
  } catch (err) {
    console.log(err);

    return res.status(500).json({error: err.message});
  }
});

router.delete('/:id', async (req, res) => {
  console.log(req);

  const {user} = req;
  const id = req.params.id;

  if (!user || user.role !== 'Shipper') {
    return res.status(403).json({error: 'Unauthorized access'});
  }

  const shipperDoc = await Shipper.findById(user.id);

  if (!shipperDoc) {
    return res.status(500).json({error: 'Shipper not found'});
  }

  try {
    const loadDoc = await Load.findById(id);

    if (!loadDoc) {
      return res.status(500).json({error: 'Load not found'});
    }

    if (loadDoc.createdBy !== shipperDoc.id) {
      return res.status(403).json({error: 'Unauthorized access'});
    }

    if (loadDoc.status !== 'NEW') {
      return res.status(500).json({error: `Can't delete load in progress`});
    }

    await loadDoc.deleteOne({id});

    return res.status(200).json({message: 'Load has been deleted'});
  } catch (err) {
    console.log(err);

    return res.status(500).json({error: err.message});
  }
});

router.patch('/:id', async (req, res) => {
  console.log(req);

  const {user} = req;
  const id = req.params.id;

  if (!user || user.role !== 'Shipper') {
    return res.status(403).json({error: 'Unauthorized access'});
  }

  const shipperDoc = await Shipper.findById(user.id);

  if (!shipperDoc) {
    return res.status(500).json({error: 'Shipper not found'});
  }

  try {
    const loadDoc = await Load.findById(id);

    if (!loadDoc) {
      return res.status(500).json({error: 'Load not found'});
    }

    if (loadDoc.createdBy !== shipperDoc.id) {
      return res.status(403).json({error: 'Unauthorized access'});
    }

    if (loadDoc.status !== 'NEW') {
      return res.status(500).json({error: `Can't post load in progress`});
    }

    await loadDoc.post();

    return res.status(200).json({message: 'Load has been posted'});
  } catch (err) {
    console.log(err);

    return res.status(500).json({error: err.message});
  }
});

module.exports = router;
