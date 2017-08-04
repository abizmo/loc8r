(function () {
  angular
    .module('loc8rApp')
    .controller('loginCtrl', ['$location', 'authentication', loginCtrl]);

  function loginCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      email: "",
      password: ""
    };

    vm.pageHeader = {
      title: "Loc8r",
      small: "Sign in!"
    };

    vm.onSubmit = function () {
      vm.formError = "";

      if (!vm.credentials.email || !vm.credentials.password){
        vm.formError = "All fields are required, please try again!";
        return false;
      }
      else {
        authentication.login(vm.credentials)
          .then(function () {
            vm.page = vm.returnPage;
            $location.search('page', null);
            $location.path(vm.page);
          })
          .catch(function (err) {
            vm.formError = "There was a problem, please try again!";
          });
      }
    };

    vm.returnPage = $location.search.page || '/';
  };
})();
