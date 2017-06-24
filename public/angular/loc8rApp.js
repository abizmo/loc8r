var loc8rData = function ($http) {
  var locationByCoords = function (lng, lat) {
    return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20000');
  };
  return {
    locationByCoords : locationByCoords
  }
};

var locationListCtrl = function ($scope, loc8rData, geolocation) {
  $scope.message = "Checking for your location!";

  $scope.getData = function (position) {
    $scope.message = "Searching...";
    var lng = position.coords.longitude;
    var lat = position.coords.latitude;

    loc8rData.locationByCoords(lng, lat)
      .then(function(response) {
        $scope.message = response.data.length > 0 ? "" : "No results";
        $scope.data = { locations: response.data };
      })
      .catch(function (e) {
        $scope.message = "Something happens!!";
        console.log(e);
      });
  };

  $scope.showError = function (err) {
    $scope.$apply(function () {
      $scope.message = err.message;
    });
  };

  $scope.noGeo = function () {
    $scope.$apply(function () {
      $scope.message = "Your browser doesn't support GeoLocation!";
    });
  };

  geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
  // $scope.message = "Searching...";
  //
  // loc8rData
  //   .then(function(response) {
  //     $scope.message = response.data.length > 0 ? "" : "No results";
  //     $scope.data = { locations: response.data };
  //   })
  //   .catch(function (e) {
  //     $scope.message = "Something happens!!";
  //     console.log(e);
  //   });
};

var formatDistance = function () {
  return function (distance) {
    if (distance >= 1000) {
      return parseFloat(distance/1000).toFixed(1) + " Km";
    } else {
      return parseInt(distance) + " m";
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

var geolocation = function () {
  var getPosition = function (cbSuccess, cbError, cbNoGeo) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
    } else {
      cbNoGeo();
    }
  };

  return {
    getPosition: getPosition
  };
};

angular
  .module('loc8rApp', [])
  .controller('locationListCtrl', locationListCtrl)
  .filter('formatDistance', formatDistance)
  .directive('ratingStars', ratingStars)
  .service('loc8rData', loc8rData)
  .service('geolocation', geolocation);
