var mongoose = require('mongoose');
var Location = mongoose.model('Location');
var shared = require('./shared');

var setRating = function (location) {
  if (location.reviews && location.reviews.length > 0) {
    var reviewCount = location.reviews.length;
    var ratingTotal = 0;

    for (var i = 0; i < reviewCount; i++) {
      ratingTotal += location.reviews[i].rating;
    }

    location.rating = parseInt(ratingTotal / reviewCount, 10);

    location.save(function (err, location) {
      if (!err) {
        console.log("Rating updated!");
      } else {
        console.log(err);
      }
    });
  }
};

var updateRatingAverage = function (locationId) {
  Location.findById(locationId)
    .select('rating reviews')
    .exec(function (err, location) {
      if (!err) {
        setRating(location);
      } else {
        console.log(err);
      }
    });
};

var addReview = function (req, res, location) {
    var review = {
      author: req.body.author,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    }
    location.reviews.push(review);

    location.save(function (err, location) {
      if (err) {
        shared.sendResponse(res, 400, err);
      } else {
        updateRatingAverage(location._id);
        shared.sendResponse(res, 201, review);
      }
    });
};

module.exports.show = function (req, res) {
  if (req.params && req.params.locationId && req.params.reviewId) {
    Location.findById(req.params.locationId)
      .select('name reviews')
      .exec(function (err, location) {
        if (!location) {
          shared.sendResponse(res, 404, { message: "Location not found!" });
          return;
        }
        if (err) {
          shared.sendResponse(res, 400, err);
          return;
        }

        if (location.reviews && location.reviews.length > 0) {
          var response, review;
          review = location.reviews.id(req.params.reviewId);
          if (!review) {
            shared.sendResponse(res, 404, { message: "Review not found!" });
          } else {
            response = { location: { name: location.name,
                                      id: req.params.locationId },
                          review: review
                        };
            shared.sendResponse(res, 200, response);
          }
        } else {
          shared.sendResponse(res, 404, { message: "No Reviews found!" });
        }
    });
  } else {
    shared.sendResponse(res, 404, { message: "Location Id or Review Id missing!" })
  }
};

module.exports.create = function (req, res) {
  if (req.params && req.params.locationId) {
    Location.findById(req.params.locationId)
      .select('reviews')
      .exec(function (err, location) {
        if (!location) {
          shared.sendResponse(res, 404, { message: "Location not found!" });
          return;
        }
        if (err) {
          shared.sendResponse(res, 400, err);
          return;
        }

        addReview(req, res, location);
    });
  } else {
    shared.sendResponse(res, 404, { message: "Location Id missing!" })
  }
};

module.exports.update = function (req, res) {
  if (req.params && req.params.locationId && req.params.reviewId) {
    Location.findById(req.params.locationId)
      .select('reviews')
      .exec(function (err, location) {
        if (!location) {
          shared.sendResponse(res, 404, { message: "Location not found!" });
          return;
        }
        if (err) {
          shared.sendResponse(res, 400, err);
          return;
        }

        if (location.reviews && location.reviews.length > 0) {
          var review;
          review = location.reviews.id(req.params.reviewId);
          if (!review) {
            shared.sendResponse(res, 404, { message: "Review not found!" });
          } else {
            if (req.body.author) {
                review.author = req.body.author;
            }
            if (req.body.rating) {
                review.rating = req.body.rating;
            }
            if (req.body.reviewText) {
                review.reviewText = req.body.reviewText;
            }
            location.save(function (err, location) {
              if (err) {
                shared.sendResponse(res, 400, err);
              } else {
                updateRatingAverage(location._id);
                shared.sendResponse(res, 200, review);
              }
            });
          }
        } else {
          shared.sendResponse(res, 404, { message: "No Reviews found!" });
        }
    });
  } else {
    shared.sendResponse(res, 404, { message: "Location Id or Review Id missing!" })
  }
};

module.exports.delete = function (req, res) {
  if (req.params && req.params.locationId && req.params.reviewId) {
    Location.findById(req.params.locationId)
      .select('reviews')
      .exec(function (err, location) {
        if (err) {
          shared.sendResponse(res, 400, err);
        } else if (!location) {
          shared.sendResponse(res, 404, { message: "Location not found!" });
        } else if (location.reviews && location.reviews.length > 0) {
          var review = location.reviews.id(req.params.reviewId);
          if (!review) {
            shared.sendResponse(res, 404, { message: "Review not found!" });
          } else {
            review.remove();
            location.save(function (err, location) {
              if (err) {
                shared.sendResponse(res, 400, err);
              } else {
                updateRatingAverage(location._id);
                shared.sendResponse(res, 204, null);
              }
            });
          }
        } else {
          shared.sendResponse(res, 404, { message: "No Reviews found!" });
        }
      });
  } else {
    shared.sendResponse(res, 404, { message: "Location Id or Review Id missing!" });
  }
};
