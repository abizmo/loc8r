(function() {
  angular
    .module('loc8r')
    .service('authentication', ['$window', authentication]);

  function authentication ($window) {
    function saveToken(token) {
      $window.localStorage['loc8r-token'] = token;
    };

    function getToken() {
      return $window.localStorage['loc8r-token'];
    };

    return {
      saveToken: saveToken,
      getToken: getToken
    };
  };
})();
