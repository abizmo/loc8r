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

    function register(user) {
      return http.post('/api/register', user)
        .then(function (data) {
          saveToken(data.token);
        });
    };

    function login(user) {
      return http.post('/api/login', user)
        .then(function (data) {
          saveToken(data.token);
        });
    };

    function logout(user) {
      $window.localStorage.removeItem('loc8r-token');
    };

    function isLoggedIn() {
      var token;
      token = getToken();

      if (token) {
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() /1000;
      }

      return false;
    };

    function currentUser() {
      if (isLoggedIn()){
        var token;
        token = getToken();

        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return {
          email: payload.email,
          name: payload.name
        };
      }
    };

    return {
      saveToken: saveToken,
      getToken: getToken,
      register: register,
      login: login,
      logout: logout,
      isLoggedIn: isLoggedIn,
      currentUser: currentUser
    };
  };
})();
