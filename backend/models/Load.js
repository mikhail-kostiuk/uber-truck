const mongoose = require('mongoose');
const schema = require('./schemas/Load');
const Truck = require('./Truck');
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
    await this.updateOne({status: 'POSTED'});

    const truck = await this.findTruck();

    if (!truck) {
      await this.updateOne({status: 'NEW'});
      return null;
    }

    const logs = this.logs;
    logs.push({message: 'En route to Pick Up', time: Date.now()});

    await this.updateOne({
      status: 'ASSIGNED',
      state: 'En route to Pick Up',
      logs,
      assignedTo: truck.createdBy,
    });

    return true;
  }

  async findTruck() {
    console.log('object');
    const trucks = await Truck.find({status: 'IS'});

    console.log(trucks);
    if (trucks.length === 0) {
      return null;
    }

    for (const truck of trucks) {
      if (this.fitLoad(truck)) {
        return truck;
      }
    }

    return null;
  }

  async fitLoad(truck) {
    return (
      this.payload < truck.payload &&
      this.dimensions.width < truck.dimensions.width &&
      this.dimensions.height < truck.dimensions.height &&
      this.dimensions.length < truck.dimensions.length
    );
  }
}

schema.loadClass(Load);

module.exports = mongoose.model('Load', schema);
