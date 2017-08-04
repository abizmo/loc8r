(function () {
  angular
    .module('loc8rApp')
    .controller('navigationCtrl', ['$location', navigationCtrl]);

  function navigationCtrl($location) {
    var vm = this;

    vm.currentPath = $location.path();

    console.log($location.path());
  };
})();
