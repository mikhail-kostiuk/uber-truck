const mongoose = require('mongoose');

const {Schema} = mongoose;

const Load = new Schema({
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
  payload: {
    type: Number,
    required: true,
  },
  dimensions: {
    length: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
});

module.exports = Load;
