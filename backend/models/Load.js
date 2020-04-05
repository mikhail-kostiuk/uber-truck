const mongoose = require('mongoose');
const schema = require('./schemas/Load');
class Load {
  static async createLoad(name, shipperId, width, length, height, payload) {
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

schema.loadClass(Load);

module.exports = mongoose.model('Load', schema);
