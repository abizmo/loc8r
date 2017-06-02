var mongoose = require('mongoose');
var Location = mongoose.model('Location');
var shared = require('./shared');

module.exports.show = function (req, res) {
  if (req.params && req.params.locationId && req.params.timeId) {
    Location.findById(req.params.locationId)
      .select('name openingHours')
      .exec(function (err, location) {
        if (err) {
          shared.sendResponse(res, 400, err);
        } else if (!location) {
          shared.sendResponse(res, 404, { message: "Location not found!" } );
        } else {
          if (location.openingHours && location.openingHours.length >0 ) {
            var time;
            time = location.openingHours.id(req.params.timeId);
            if (!time) {
              shared.sendResponse(res, 404, { message: "Location not found!" } );
            } else {
              var response;
              response = {
                location: {
                  name: location.name,
                  id: req.params.locationId
                },
                openingHour: time
              };
              shared.sendResponse(res, 200, response);
            }
          } else {
            shared.sendResponse(res, 404, { message: "No locations found!" });
          }
        }
      });
  } else {
    shared.sendResponse(res, 404, { message: "Location Id missing!" } );
  }
};

module.exports.create = function (req, res) {
  //Find location
  if (req.params && req.params.locationId) {
    Location.findById(req.params.locationId)
      .select('openingHours')
      .exec(function (err, location) {
        if (err) {
          shared.sendResponse(res, 400, err);
        } else if (!location) {
          shared.sendResponse(res, 404, { message: "Location not found!" } );
        } else {
          //Add time
          var time = {
            days: req.body.days,
            opening: req.body.opening,
            closing: req.body.closing,
            closed: req.body.closed
          };
          location.openingHours.push(time);
          location.save(function (err,location) {
            if (err) {
              shared.sendResponse(res, 400, err);
            } else {
              //Send response
              shared.sendResponse(res, 201, time );
            }
          });
        }
      });
  } else {
    shared.sendResponse(res, 404, { message: "Location Id missing!"} );
  }
};

module.exports.update = function (req, res) {
  if (req.params && req.params.locationId && req.params.timeId) {
    Location.findById(req.params.locationId)
      .select('name openingHours')
      .exec(function (err, location) {
        if (err) {
          shared.sendResponse(res, 400, err);
        } else if (!location) {
          shared.sendResponse(res, 404, { message: "Location not found!" } );
        } else {
          if (location.openingHours && location.openingHours.length >0 ) {
            var time;
            time = location.openingHours.id(req.params.timeId);
            if (!time) {
              shared.sendResponse(res, 404, { message: "Location not found!" } );
            } else {
              if (req.body.days) {
                time.days = req.body.days;
              }
              if (req.body.opening) {
                time.opening = req.body.opening;
              }
              if (req.body.closing) {
                time.closing = req.body.closing;
              }
              if (req.body.closed) {
                time.closed = req.body.closed;
              }
              location.save(function (err, location) {
                if (err) {
                  shared.sendResponse(res, 400, err);
                } else {
                  shared.sendResponse(res, 200, time);
                }
              });
            }
          } else {
            shared.sendResponse(res, 404, { message: "No locations found!" });
          }
        }
      });
  } else {
    shared.sendResponse(res, 404, { message: "Location Id missing!" } );
  }
};

module.exports.delete = function (req, res) {
  if (req.params && req.params.locationId && req.params.timeId) {
    Location.findById(req.params.locationId)
      .select('name openingHours')
      .exec(function (err, location) {
        if (err) {
          shared.sendResponse(res, 400, err);
        } else if (!location) {
          shared.sendResponse(res, 404, { message: "Location not found!" } );
        } else {
          if (location.openingHours && location.openingHours.length >0 ) {
            var time;
            time = location.openingHours.id(req.params.timeId);
            if (!time) {
              shared.sendResponse(res, 404, { message: "Location not found!" } );
            } else {
              time.remove();
              location.save(function (err, location) {
                if (err) {
                  shared.sendResponse(res, 400, err);
                } else {
                  shared.sendResponse(res, 204, null);
                }
              });
            }
          } else {
            shared.sendResponse(res, 404, { message: "No locations found!" });
          }
        }
      });
  } else {
    shared.sendResponse(res, 404, { message: "Location Id missing!" } );
  }
};
