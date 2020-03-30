const mongoose = require('mongoose');
const Truck = require('./Truck');
const {encryptPassword, comparePasswords} = require('../utils/password');

const {Schema} = mongoose;

const driverSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

class DriverClass {
  static async add(name, email, password) {
    const encryptedPassword = await encryptPassword(password);

    return await this.create({name, email, password: encryptedPassword});
  }

  static async findByEmail(email) {
    return await this.findOne({email});
  }

  async verifyPassword(password) {
    return await comparePasswords(password, this.password);
  }

  async changePassword(newPassword) {
    const encryptedNewPassword = await encryptPassword(newPassword);

    return await this.updateOne({password: encryptedNewPassword});
  }

  async getCreatedTrucks() {
    return await Truck.find({createdBy: this.id});
  }
}

driverSchema.loadClass(DriverClass);

module.exports = mongoose.model('Driver', driverSchema);
