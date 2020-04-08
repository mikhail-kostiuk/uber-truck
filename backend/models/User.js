const mongoose = require('mongoose');
const schema = require('./schemas/User');
const Truck = require('./Truck');
const Load = require('./Load');
const {encryptPassword, comparePasswords} = require('../utils/password');

class User {
  static async createUser(username, password, role) {
    const encryptedPassword = await encryptPassword(password);

    return await this.create({
      username,
      password: encryptedPassword,
      role: role.toLowerCase(),
    });
  }

  static async findByUsername(username) {
    return await this.findOne({username});
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

  async getCreatedLoads() {
    return await Load.find({createdBy: this.id});
  }

  async getAssignedLoads() {
    return await Load.find({assignedTo: this.id});
  }
}

schema.loadClass(User);

module.exports = mongoose.model('User', schema);
