const mongoose = require('mongoose');

module.exports = class DatabaseMock {
  constructor(connectionUrl = process.env.SPEC_MONGO_URL) {
    Object.assign(this, { connectionUrl });
  }
  
  connect() {
    mongoose.connect(this.connectionUrl);
  }
  
  disconnect() {
    mongoose.disconnect();
  }
  
  clearDb(cb) {
    mongoose.connection.db.dropDatabase(cb);
  }
};
