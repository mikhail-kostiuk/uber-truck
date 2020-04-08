const mongoose = require('mongoose');
const schema = require('./schemas/Truck');
class Truck {
  static async createTruck(userId, type) {
    return await this.create({
      createdBy: userId,
      assignedTo: '',
      status: 'IS',
      type,
    });
  }

  static async assignTo(truckId, userId) {
    await this.findOneAndUpdate({assignedTo: userId}, {assignedTo: ''});

    return await this.findByIdAndUpdate(truckId, {assignedTo: userId});
  }
}

schema.loadClass(Truck);

module.exports = mongoose.model('Truck', schema);
