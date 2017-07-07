(function () {
  angular
    .module('loc8rApp')
    .controller('homeCtrl', ['$scope', 'loc8rData', 'geolocation', homeCtrl]);

  function homeCtrl($scope, loc8rData, geolocation) {
    var vm = this;
    vm.pageHeader = {
      title: 'Loc8r',
      small: 'Find places to work with wifi near to you!'
    };
    vm.sidebar = {
      content: "Looking for wifi and seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for."
    };
    vm.message = "Checking for your location!";

    vm.getData = function (position) {
      vm.message = "Searching...";
      var lng = position.coords.longitude;
      var lat = position.coords.latitude;

      loc8rData.locationByCoords(lng, lat)
        .then(function(response) {
          vm.message = response.data.length > 0 ? "" : "No results";
          vm.data = { locations: response.data };
        })
        .catch(function (e) {
          vm.message = "Something happens!!";
          console.log(e);
        });
    };

    vm.showError = function (err) {
      $scope.$apply(function () {
        vm.message = err.message;
      });
    };

    vm.noGeo = function () {
      $scope.$apply(function () {
        vm.message = "Your browser doesn't support GeoLocation!";
      });
    };

    geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);
  };
})();
