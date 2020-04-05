const mongoose = require('mongoose');

const {Schema} = mongoose;

const Truck = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  capacity: {
    payload: {
      type: Number,
    },
    dimensions: {
      width: {
        type: Number,
      },
      length: {
        type: Number,
      },
      height: {
        type: Number,
      },
    },
  },
});

module.exports = Truck;
