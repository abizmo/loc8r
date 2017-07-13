(function () {
  angular
    .module('loc8rApp')
    .controller('locationDetailCtrl', ['$routeParams', 'loc8rData', locationDetailCtrl]);

  function locationDetailCtrl($routeParams, loc8rData) {
    var vm = this;
    var locationId = $routeParams.locationId;

    loc8rData.locationById(locationId)
      .then(function (response) {
        vm.location = response.data;
        vm.pageHeader = {
          title: vm.location.name
        };
      })
      .catch(function (err) {
        console.log(err);
      });
  };
})();
