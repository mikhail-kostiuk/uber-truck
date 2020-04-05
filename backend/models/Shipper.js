const mongoose = require('mongoose');
const schema = require('./schemas/Shipper');
const Load = require('./Load');
const {encryptPassword, comparePasswords} = require('../utils/password');
class Shipper {
  static async createShipper(name, email, password) {
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

  async getCreatedLoads() {
    return await Load.find({createdBy: this.id});
  }
}

schema.loadClass(Shipper);

module.exports = mongoose.model('Shipper', schema);
