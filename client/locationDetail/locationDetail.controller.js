(function () {
  angular
    .module('loc8rApp')
    .controller('locationDetailCtrl', ['$routeParams', '$uibModal', '$location', 'authentication', 'loc8rData', locationDetailCtrl]);

  function locationDetailCtrl($routeParams, $uibModal, $location, authentication, loc8rData) {
    var vm = this;
    vm.locationId = $routeParams.locationId;

    loc8rData.locationById(vm.locationId)
      .then(function (response) {
        vm.location = response.data;
        vm.pageHeader = {
          title: vm.location.name
        };
      })
      .catch(function (err) {
        console.log(err);
      });

    vm.popupReviewForm = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'reviewModal/reviewModal.view.html',
        controller: 'reviewModalCtrl',
        controllerAs: 'vm',
        resolve: {
          locationData: function () {
            return {
              locationName: vm.location.name,
              locationId: vm.locationId
            };
          }
        }
      });

      modalInstance.result.then(function (result) {
        vm.location.reviews.push(result);
      });
    };

    vm.popupTimeForm = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'timeModal/timeModal.view.html',
        controller: 'timeModalCtrl',
        controllerAs: 'vm',
        resolve: {
          locationData: function () {
            return {
              locationName: vm.location.name,
              locationId: vm.location._id
            };
          }
        }
      });

      modalInstance.result.then(function (result) {
        vm.location.openingHours.push(result);
      });
    };

    vm.currentPath = $location.path();

    vm.isLoggedIn = authentication.isLoggedIn();
  };
})();
