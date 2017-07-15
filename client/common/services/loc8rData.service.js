(function () {
  angular
    .module('loc8rApp')
    .service('loc8rData', ['$http', loc8rData]);

  function loc8rData($http) {
    var locationByCoords = function (lng, lat) {
      return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20000');
    };

    var locationById = function (locationId) {
      return $http.get('/api/locations/' + locationId);
    };

    var addReviewById = function (locationId, reviewData) {
      return $http.post('/api/locations/' + locationId + '/reviews', reviewData);
    };

    var addTimeById = function (locationId, timeData) {
      return $http.post('/api/locations/' + locationId + '/times', timeData);
    };

    return {
      locationByCoords : locationByCoords,
      locationById: locationById,
      addReviewById: addReviewById,
      addTimeById: addTimeById
    };
  };
})();
