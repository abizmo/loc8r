(function () {
  angular
    .module('loc8rApp')
    .controller('reviewModalCtrl', ['$uibModalInstance', 'locationData', 'loc8rData', 'authentication', reviewModalCtrl]);

  function reviewModalCtrl($uibModalInstance, locationData, loc8rData, authentication) {
    var vm = this;

    vm.formData = {};
    vm.locationData = locationData;

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
      if (!vm.formData.rating || !vm.formData.reviewText) {
        vm.formError = "All fields are required, please try again";
        return false;
      } else {
        vm.doAddReview(vm.locationData.locationId, vm.formData);
      }
    };

    vm.doAddReview = function (locationId, formData) {
      loc8rData.addReviewById(locationId, {
        rating: formData.rating,
        reviewText: formData.reviewText
      })
        .then(function (data) {
          vm.modal.close(data.data);
        })
        .catch(function (err) {
          vm.formError = "Your review has not been saved, please try again.";
        });
      return false;
    };
  };
})();
