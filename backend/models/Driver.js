const mongoose = require('mongoose');
const schema = require('./schemas/Driver');
const Truck = require('./Truck');
const Load = require('./Load');
const {encryptPassword, comparePasswords} = require('../utils/password');
class Driver {
  static async createDriver(name, email, password) {
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

  async getAssignedLoads() {
    return await Load.find({assignedTo: this.id});
  }
}

schema.loadClass(Driver);

module.exports = mongoose.model('Driver', schema);
