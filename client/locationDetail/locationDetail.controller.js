(function () {
  angular
    .module('loc8rApp')
    .controller('locationDetailCtrl', ['$routeParams', locationDetailCtrl]);

  function locationDetailCtrl($routeParams) {
    var vm = this;
    var locationId = $routeParams.locationId;

    vm.pageHeader = {
      title: locationId
    };
  };
})();
