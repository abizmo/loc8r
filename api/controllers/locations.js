var mongoose = require('mongoose');
var Location = mongoose.model('Location');
var shared = require('./shared');

var buildLocationsList = function (results, stats) {
  var locations = [];
  results.forEach(function (doc) {
    locations.push({
      distance: doc.dis,
      name: doc.obj.name,
      address: doc.obj.address,
      facilities: doc.obj.facilities,
      raiting: doc.obj.raiting,
      _id: doc.obj._id
    });
  });
  return locations;
};

module.exports.index = function (req, res) {
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);
  var maxDistance = parseFloat(req.query.maxDistance) || 20000;

  if ((!lng && lng !== 0) || !lat && lat !== 0) {
    shared.sendResponse(res, 400, { message: "The longitude and latitude query parameters are required" });
    return;
  }

  var point = {
    type: "Point",
    coordinates: [lng, lat]
  };
  var geoOptions = {
    spherical: true,
    num: 10,
    maxDistance: maxDistance
  };

  Location.geoNear(point, geoOptions, function (err, results, stats) {
    if (err) {
      shared.sendResponse(res, 400, err);
      return;
    }
    var locations;
    locations = buildLocationsList(results, stats);
    shared.sendResponse(res, 200, locations);
  });
};

module.exports.create = function (req, res) {
  var location = {};
  if (req.body.name) {
      location.name= req.body.name;
  }
  if (req.body.address) {
      location.address= req.body.address;
  }
  if (req.body.facilities) {
      location.facilities= req.body.facilities.split(",");
  }
  if (req.body.lng && req.body.lat) {
      location.coords= [parseFloat(req.body.lng), parseFloat(req.body.lat)];
  }
  Location.create(location, function (err, location) {
    if (err) {
      shared.sendResponse(res, 400, err);
    } else {
      shared.sendResponse(res, 201, location);
    }
  });

};

module.exports.show = function (req, res) {
  if (req.params && req.params.locationId) {
    Location.findById(req.params.locationId)
      .exec(function (err, location) {
        if (!location) {
          shared.sendResponse(res, 404, { message: "Location not found!" });
          return;
        }
        if (err) {
          shared.sendResponse(res, 400, err);
          return;
        }
        shared.sendResponse(res, 200, location);
    });
  } else {
    shared.sendResponse(res, 404, { message: "Location Id missing!" })
  }
};

module.exports.update = function (req, res) {
  if (req.params && req.params.locationId) {
    Location.findById(req.params.locationId)
      .exec(function (err, location) {
        if (!location) {
          shared.sendResponse(res, 404, { message: "Location not found!" });
          return;
        }
        if (err) {
          shared.sendResponse(res, 400, err);
          return;
        }
        if (req.body.name) {
            location.name= req.body.name;
        }
        if (req.body.address) {
            location.address= req.body.address;
        }
        if (req.body.facilities) {
            location.facilities= req.body.facilities.split(",");
        }
        if (req.body.lng && req.body.lat) {
            location.coords= [parseFloat(req.body.lng), parseFloat(req.body.lat)];
        }
        location.save(function (err, location) {
          if (err) {
            shared.sendResponse(res, 400, err);
          } else {
            shared.sendResponse(res, 200, location);
          }
        });
    });
  } else {
    shared.sendResponse(res, 404, { message: "Location Id missing!" })
  }
};

module.exports.delete = function (req, res) {
  if (req.params && req.params.locationId) {
    Location.findByIdAndRemove(req.params.locationId)
      .exec(function (err, location) {
        if (err) {
          shared.sendResponse(res, 400, err);
        } else {
          shared.sendResponse(res, 204, null);
        }
      });
  } else {
    shared.sendResponse(res, 404, { message: "Location Id missing!" });
  }

};
