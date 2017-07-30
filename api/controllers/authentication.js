const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const shared = require('./shared');

module.exports.register = function (req, res) {
  var email = req.body.email;
  var name = req.body.name;
  var password = req.body.password;

  if (!email || !name || !password) {
    shared.sendResponse(res, 400, { message: "All fields are required!" });
    return;
  }

  var user = new User();
  user.email = email;
  user.name = name;
  user.setPassword(password);
  user.save(function (err, user) {
    if (err) {
      shared.sendResponse(res, 400, err);
    } else {
      var jwt = user.generateJwt();
      shared.sendResponse(res, 201, {
        token: jwt
      });
    }
  });
};

module.exports.login = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  if (!email || !password) {
    shared.sendResponse(res, 400, { message: "All the fields are required!" });
    return;
  }

  passport.authenticate('local', function (err, user, info) {
    if (err) {
      shared.sendResponse(res, 400, err);
      return;
    }

    if (user) {
      var jwt = user.generateJwt();
      shared.sendResponse(res, 200, {
        token: jwt
      });
    } else {
      shared.sendResponse(res, 400, info);
    }
  })(req, res);
};
