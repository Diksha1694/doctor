var env = process.env.NODE_ENV || 'development';

var config = module.exports = {};

config.env = env;

config.appPort   = '5000';
config.hostUrl   = 'http://localhost:5000';

config.mongo     = {};
config.mongo.db   = 'appointmentSystem';
config.mongo.host = 'localhost';
config.mongo.port = '27017';
config.secret ='superSecret';

config.bcryptSaltLength= 10;

module.exports   = config;