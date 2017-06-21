var loc8rData = function ($http) {
  return $http.get('/api/locations?lng=-15.489367&lat=28.091628&maxDistance=5');
};
//lng: -15.489367,
//     lat: 28.091628,
//     maxDistance: 20

var locationListCtrl = function ($scope, loc8rData) {
  $scope.message = "Searching...";

  loc8rData
    .then(function(response) {
      $scope.message = response.data.length > 0 ? "" : "No results";
      $scope.data = { locations: response.data };
    })
    .catch(function (e) {
      $scope.message = "Something happens!!";
      console.log(e);
    });
};

var formatDistance = function () {
  return function (distance) {
    if (distance > 1) {
      return parseInt(distance) + " Km";
    } else {
      return parseInt(distance * 1000) + " m";
    }
  };
};

var ratingStars = function () {
  return {
    scope: {
      thisRating: '=rating'
    },
    templateUrl: "angular/ratingStars.html"
  };
};

angular
  .module('loc8rApp', [])
  .controller('locationListCtrl', locationListCtrl)
  .filter('formatDistance', formatDistance)
  .directive('ratingStars', ratingStars)
  .service('loc8rData', loc8rData);
