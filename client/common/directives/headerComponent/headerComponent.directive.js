(function () {
  angular
    .module('loc8rApp')
    .directive('headerComponent', headerComponent);

  function headerComponent() {
    return {
      restric: 'EA',
      templateUrl: '/common/directives/headerComponent/headerComponent.template.html',
      controller: 'navigationCtrl as navvm'
    };
  };
})();
