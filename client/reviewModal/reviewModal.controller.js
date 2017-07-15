(function () {
  angular
    .module('loc8rApp')
    .controller('reviewModalCtrl', ['$uibModalInstance', 'locationData', reviewModalCtrl]);

  function reviewModalCtrl($uibModalInstance, locationData) {
    var vm = this;

    vm.locationData = locationData;

    vm.modal = {
      cancel: function () {
        $uibModalInstance.dismiss('cancel');
      }
    };
  };
})();
