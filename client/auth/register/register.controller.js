(function () {
  angular
    .module('loc8rApp')
    .controller('registerCtrl', ['$location', 'authentication', registerCtrl]);

  function registerCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      name: "",
      email: "",
      password: ""
    };

    vm.pageHeader = {
      title: "Loc8r",
      small: "Sign up now and find your place"
    };

    vm.onSubmit = function () {
      vm.formError = "";

      if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password){
        vm.formError = "All fields are required, please try again!";
        return false;
      }
      else {
        authentication.register(vm.credentials)
          .then(function () {
            $location.search('page', null);
            $location.path(vm.returnPage);
          })
          .catch(function (err) {
            vm.formError = "There was a problem, please try again!";
          });
      }
    };

    vm.returnPage = $location.search().page || '/';
  };
})();
