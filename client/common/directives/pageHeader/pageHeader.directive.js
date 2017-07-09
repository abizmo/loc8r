(function () {
  angular
    .module('loc8rApp')
    .directive('pageHeader', pageHeader);

  function pageHeader() {
    return {
      restric: 'EA',
      scope: {
        content: '=content'
      },
      templateUrl: '/common/directives/pageHeader/pageHeader.template.html'
    };
  };
})();
