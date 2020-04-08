const mongoose = require('mongoose');
const schema = require('./schemas/Load');
const Truck = require('./Truck');
const {getTruckDimensions, getTruckPayload} = require('../utils/truck');
class Load {
  static async createLoad(userId, payload, dimensions) {
    return await this.create({
      createdBy: userId,
      logs: [],
      status: 'NEW',
      payload,
      dimensions,
    });
  }

  static async findByName(name) {
    return await this.findOne({name});
  }

  async changeState() {
    let newStatus = null;
    switch (this.state) {
      case 'En route to Pick Up':
        await this.updateOne({state: 'Arrived to Pick Up'});
        newStatus = 'Arrived to Pick Up';
        break;
      case 'Arrived to Pick Up':
        await this.updateOne({state: 'En route to delivery'});
        newStatus = 'En route to delivery';
        break;
      case 'En route to delivery':
        await this.updateOne({state: 'Arrived to delivery'});
        newStatus = 'Arrived to delivery';
        break;
      default:
        break;
    }

    return newStatus;
  }

  async post() {
    await this.updateOne({status: 'POSTED'});

    const truck = await this.findTruck();

    if (!truck) {
      await this.updateOne({status: 'NEW'});
      return null;
    }

    await truck.updateOne({status: 'OL'});

    const logs = this.logs;
    logs.push({message: 'En route to Pick Up', time: Date.now()});

    await this.updateOne({
      status: 'ASSIGNED',
      state: 'En route to Pick Up',
      logs,
      assignedTo: truck.assignedTo,
    });

    return truck.assignedTo;
  }

  async findTruck() {
    const trucks = await Truck.find({status: 'IS', assignedTo: {$ne: ''}});

    if (trucks.length === 0) {
      return null;
    }

    for (let i = 0; i < trucks.length; i++) {
      const truck = {...trucks[i]._doc};

      truck.payload = getTruckPayload(truck.type);
      truck.dimensions = getTruckDimensions(truck.type);

      if (this.fitLoad(truck)) {
        return trucks[i];
      }
    }

    return null;
  }

  fitLoad(truck) {
    return (
      this.payload <= truck.payload &&
      this.dimensions.width <= truck.dimensions.width &&
      this.dimensions.height <= truck.dimensions.height &&
      this.dimensions.length <= truck.dimensions.length
    );
  }
}

schema.loadClass(Load);

module.exports = mongoose.model('Load', schema);
