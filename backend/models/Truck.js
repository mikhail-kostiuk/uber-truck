const mongoose = require('mongoose');
const Driver = require('./Driver');

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
  static async add({name, driverId, type}) {
    try {
      const driverDoc = await Driver.findById(driverId);

      if (!driverDoc) {
        throw new Error('Driver not found');
      }

      const truckDoc = await this.findByName(name);

      if (truckDoc) {
        throw new Error('Truck with this name already exists');
      }

      const createdTruckDoc = await this.create({
        name,
        createdBy: driverId,
        status: 'IS',
        type,
      });

      return createdTruckDoc;
    } catch (err) {
      throw err;
    }
  }

  static async findByName(name) {
    return await this.findOne({name});
  }

  static async assign({driverId, truckId}) {
    try {
      const driverDoc = await Driver.findById(driverId);
      console.log(driverId);

      if (!driverDoc) {
        throw new Error('Driver not found');
      }

      const truckDoc = await this.findById(truckId);

      if (!truckDoc) {
        throw new Error('Truck not found');
      }

      if (truckDoc.createdBy !== driverDoc.id) {
        throw new Error('Unauthorized access');
      }

      await this.findOneAndUpdate({assignedTo: driverId}, {assignedTo: null});

      const updatedTruckDoc = await truckDoc.updateOne({assignedTo: driverId});

      return updatedTruckDoc;
    } catch (err) {
      throw err;
    }
  }
}

truckSchema.loadClass(TruckClass);

module.exports = mongoose.model('Truck', truckSchema);
