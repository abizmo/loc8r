const mongoose = require('mongoose');

var dbURI = "mongodb://localhost/loc8r";

if ( process.env.NODE_ENV === "production") {
  dbURI = process.env.MONGOLAB_URI;
}
mongoose.connect(dbURI);

var db = mongoose.connection;

db.once('open', function () {
  console.log('You are connected to ' + dbURI);
});

db.on('error', function (err) {
  console.log('Connection error: ' + err);
});

db.on('disconect', function () {
  console.log('You have been disconnected');
});

var closingBD = function (msg, cb) {
  db.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    cb();
  });
};

process.on('SIGINT', function () {
  closingBD('App termination', function () {
    process.exit(0);
  });
});

process.once('SIGUSR2', function (){
  closingBD('Nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGTERM', function () {
  closingBD('Heroku app termination', function () {
    process.exit(0);
  });
});

require('./locations');
