(function () {
  angular
    .module('loc8rApp')
    .directive('footerComponent', footerComponent);

  function footerComponent() {
    return {
      restric: 'EA',
      templateUrl: '/common/directives/footerComponent/footerComponent.template.html'
    };
  };
})();
