const mongoose = require('mongoose');

const {Schema} = mongoose;

const loadSchema = new Schema({
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

class LoadClass {
  static async add(name, shipperId, width, length, height, payload) {
    console.log('class', name);
    return await this.create({
      name,
      createdBy: shipperId,
      logs: [],
      status: 'NEW',
      dimensions: {
        width,
        length,
        height,
      },
      payload,
    });
  }

  static async findByName(name) {
    return await this.findOne({name});
  }

  async post() {
    return await this.updateOne({status: 'POSTED'});
  }
}

loadSchema.loadClass(LoadClass);

module.exports = mongoose.model('Load', loadSchema);
