var locationListCtrl = function ($scope) {
  $scope.data = {
    locations: [{
      name: 'Burger Queen',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 3,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      distance: '0.296456',
      _id: '5370a35f2536f6785f8dfb6a' }, {
      name: 'Costy',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 5,
      facilities: ['Hot drinks', 'Food', 'Alcoholic drinks'],
      distance: '0.7865456',
      _id: '5370a35f2536f6785f8dfb6a'
    }]
  };
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
  .directive('ratingStars', ratingStars);
