var mongoose = require('mongoose');
var config   = require('./../config/config');
var db       = mongoose.connection;
var connectionInstance;


if(connectionInstance) {
  module.exports = connectionInstance;
  return;
}

connectionInstance  =  mongoose.connect('mongodb://127.0.0.1:27017/doc');


db.on('error', function (err) {
  if(err) {
    throw err;
  }
});


db.once('open', function() {
	console.log("MongoDb connected successfully");
});


module.exports = connectionInstance;


	