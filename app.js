const dotenv = require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const uglify = require('uglify-js');
const fs = require('fs');
const passport = require('passport');

require('./api/models/db.js');
require('./api/config/passport');

var routesApi = require('./api/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server','views'));
app.set('view engine', 'jade');

// minifying js
var appClientFiles = {
  "client/app.js": fs.readFileSync("client/app.js", "utf8"),
  "client/home/home.controller.js": fs.readFileSync("client/home/home.controller.js", "utf8"),
  "client/locationDetail/locationDetail.controller.js": fs.readFileSync("client/locationDetail/locationDetail.controller.js", "utf8"),
  "client/reviewModal/reviewModal.controller.js": fs.readFileSync("client/reviewModal/reviewModal.controller.js", "utf8"),
  "client/timeModal/timeModal.controller.js": fs.readFileSync("client/timeModal/timeModal.controller.js", "utf8"),
  "client/common/services/loc8rData.service.js": fs.readFileSync("client/common/services/loc8rData.service.js", "utf8"),
  "client/common/services/geolocation.service.js": fs.readFileSync("client/common/services/geolocation.service.js", "utf8"),
  "client/common/filters/formatDistance.filter.js": fs.readFileSync("client/common/filters/formatDistance.filter.js", "utf8"),
  "client/common/directives/ratingStars/ratingStars.directive.js": fs.readFileSync("client/common/directives/ratingStars/ratingStars.directive.js", "utf8"),
  "client/common/directives/footerComponent/footerComponent.directive.js": fs.readFileSync("client/common/directives/footerComponent/footerComponent.directive.js", "utf8"),
  "client/common/directives/headerComponent/headerComponent.directive.js": fs.readFileSync("client/common/directives/headerComponent/headerComponent.directive.js", "utf8"),
  "client/common/directives/pageHeader/pageHeader.directive.js": fs.readFileSync("client/common/directives/pageHeader/pageHeader.directive.js", "utf8"),
  "client/about/about.controller.js": fs.readFileSync("client/about/about.controller.js", "utf8"),
  "client/common/filters/addHtmlLineBreaks.filter.js": fs.readFileSync("client/common/filters/addHtmlLineBreaks.filter.js", "utf8")
};

var uglified = uglify.minify(appClientFiles, { compress: false });

fs.writeFile('public/angular/loc8r.min.js', uglified.code, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Minify succesfull!');
  }
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));

app.use(passport.initialize());
app.use('/api', routesApi);

app.use(function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
