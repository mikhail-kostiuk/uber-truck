const mongoose = require('mongoose');

const {Schema} = mongoose;

const truckSchema = new Schema({
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
});

class TruckClass {
  static async add(name, driverId, type) {
    return await this.create({
      name,
      createdBy: driverId,
      status: 'IS',
      type,
    });
  }

  static async findByName(name) {
    return await this.findOne({name});
  }

  async assignTo(driverId) {
    await this.findOneAndUpdate({assignedTo: driverId}, {assignedTo: null});

    return await truckDoc.updateOne({assignedTo: driverId});
  }
}

truckSchema.loadClass(TruckClass);

module.exports = mongoose.model('Truck', truckSchema);
