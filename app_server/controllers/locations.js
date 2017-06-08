var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://floating-atoll-44743.herokuapp.com";
}

function renderHomePage(req, res, locations) {
  var message;

  if (!(locations instanceof Array)) {
    locations = [];
    message = "Api lookup error!";
  } else if (!locations.length) {
    message = "No locations found nearby!";
  }
  res.render('locationIndex', { title: 'Loc8r - Locations',
                                pageHeader: { title: 'Loc8r',
                                                small: 'Find places to work with wifi near to you!' },
                                locations: locations,
                                sidebar: "Looking for wifi and seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
                                message: message });
};

function renderShowPage(req, res, location) {
  res.render('locationShow', { title: 'Loc8r - ' + location.name,
                                location: location,
                                sidebar: {
                                  context: "is on Loc8r because it has accesible wifi and space to sit down with your laptop and get some work done.",
                                  cta: "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
                                }});
};

function _showError(req, res, status) {
  var title, content;
  if (status === 404) {
    title = "Page not found!";
    content = "You seem lost...";
  } else {
    title = "Something's gone wrong!";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.render('error', {
    title: title,
    content: content,
    status: status
  });
}

function displayDistance(distance) {
  if (distance > 1) {
    return parseInt(distance) + " Km";
  } else {
    return parseInt(distance * 1000) + " m";
  }
};

module.exports.index = function (req, res, next) {
  var requestOptions, path;
  path = "/api/locations";
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
    qs: {
      lng: -15.489367,
      lat: 28.091628,
      maxDistance: 20
    }
  };

  request(requestOptions, function (err, response, body) {
    if (response.statusCode === 200 && body.length) {
      var data, i;
      data = body;
      for (var i = 0; i < data.length; i++) {
        data[i].distance = displayDistance(data[i].distance);
      }
    }
    renderHomePage(req, res, data);
  });
};

module.exports.show = function (req, res, next) {
  var requestOptions, path;
  path = "/api/locations/" + req.params.locationId;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
    qs: {}
  };

  request(requestOptions, function (err, response, body) {
    if (response.statusCode === 200) {
      var data;
      data = body;
      data.coords = {
        lng: body.coords[0],
        lat: body.coords[1]
      };
      renderShowPage(req, res, body);
    } else {
      _showError(req, res, response.statusCode);
    }
  });
};

module.exports.addReview = function (req, res, next) {
  name = 'Starcups';
  res.render('locationAddReview', { title: 'Loc8r - Add Review',
                                    pageHeader: { title: 'Review ' + name } } );
};
