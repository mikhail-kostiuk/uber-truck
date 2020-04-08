const express = require('express');
const Driver = require('../../models/Driver');

const router = new express.Router();

router.get('/:id/loads', async (req, res) => {
  console.log(req);

  const {user} = req;

  if (!user || user.role !== 'Driver') {
    return res.status(403).json({error: 'Unauthorized Access'});
  }

  try {
    const driverDoc = await Driver.findById(user.id);

    if (!driverDoc) {
      return res.status(500).json({error: 'Driver not found'});
    }

    const assignedLoadsDocs = await driverDoc.getAssignedLoads();

    return res.status(200).json({loads: assignedLoadsDocs});
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
});

module.exports = router;
