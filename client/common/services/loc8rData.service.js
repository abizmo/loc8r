(function () {
  angular
    .module('loc8rApp')
    .service('loc8rData', ['$http', loc8rData]);

  function loc8rData($http) {
    var locationByCoords = function (lng, lat) {
      return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20000');
    };
    return {
      locationByCoords : locationByCoords
    };
  };
})();
