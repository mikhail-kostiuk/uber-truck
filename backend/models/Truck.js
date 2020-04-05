const mongoose = require('mongoose');
const schema = require('./schemas/Truck');
const {getTruckCapacity} = require('../utils/truck');
class Truck {
  static async createTruck(name, driverId, type) {
    return await this.create({
      name,
      createdBy: driverId,
      status: 'NIS',
      type,
      capacity: getTruckCapacity(type),
    });
  }

  static async findByName(name) {
    return await this.findOne({name});
  }

  async assignTo(driverId) {
    await this.findOneAndUpdate(
      {assignedTo: driverId},
      {assignedTo: null, status: 'NIS'},
    );

    return await this.updateOne({assignedTo: driverId, status: 'IS'});
  }
}

schema.loadClass(Truck);

module.exports = mongoose.model('Truck', schema);
