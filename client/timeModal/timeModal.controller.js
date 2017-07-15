(function () {
  angular
    .module('loc8rApp')
    .controller('timeModalCtrl', ['$uibModalInstance', 'locationData', 'loc8rData',timeModalCtrl]);

  function timeModalCtrl ($uibModalInstance, locationData, loc8rData) {
    var vm = this;

    vm.locationData = locationData;
    vm.formData = {
      closed: false
    };

    vm.modal = {
      cancel: function () {
        $uibModalInstance.dismiss('cancel');
      },
      close: function (result) {
        $uibModalInstance.close(result);
      }
    };

    vm.onSubmit = function () {
      vm.formError = "";

      if (!vm.formData.days || (!vm.formData.closed && !vm.formData.opening && !vm.formData.closing)) {
        vm.formError = "Please fill the corrects fields!";
        return false;
      } else {
        vm.doAddTime(vm.locationData.locationId, vm.formData);
      }
    };

    vm.doAddTime = function (locationId, formData) {
      loc8rData.addTimeById(locationId, formData)
        .then(function (data) {
          vm.modal.close(data.data);
        })
        .catch(function (err) {
          vm.formError = "Your time has not been saved, please try again.";
        });
      return false;
    };
  };
})();
