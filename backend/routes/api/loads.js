const express = require('express');
const Load = require('../../models/Load');
const Shipper = require('../../models/Shipper');
const schemas = require('../../joi/loads');

const router = new express.Router();

router.post('/', async (req, res) => {
  // console.log(req);

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

    const loadDoc = await Load.findByName(name);

    if (loadDoc) {
      return res.status(500).json({error: 'Load name already exists'});
    }

    const createdLoadDoc = await Load.add(
      name,
      user.id,
      width,
      length,
      height,
      payload,
    );

    return res.status(200).json(createdLoadDoc);
  } catch (err) {
    // console.log(err);

    return res.status(500).json({error: err.message});
  }
});

router.get('/', async (req, res) => {
  // console.log(req);

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

module.exports = router;
