const mongoose = require('mongoose');

module.exports = class DatabaseMock {
  constructor(connectionUrl = process.env.SPEC_MONGO_URL) {
    Object.assign(this, { connectionUrl });
  }
  
  connect() {
    if(mongoose.connection.db && mongoose.connection.readyState) {
      return;
    }
    
    mongoose.connect(this.connectionUrl);
  }
  
  disconnect() {
    mongoose.disconnect();
  }
  
  clearCollection(collection, cb) {
    mongoose.connection.db.clearCollection(collection, cb);
  }
  
  clearDb(cb) {
    mongoose.connection.db.dropDatabase(cb);
  }
};
