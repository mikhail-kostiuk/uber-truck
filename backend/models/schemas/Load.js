const mongoose = require('mongoose');

const {Schema} = mongoose;

const Load = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  logs: [
    {
      message: {
        type: String,
        required: true,
      },
      time: {
        type: Number,
        required: true,
      },
    },
  ],
  assignedTo: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  dimensions: {
    width: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  payload: {
    type: Number,
    required: true,
  },
});

module.exports = Load;
