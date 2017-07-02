angular
  .module('loc8rApp', ['ngRoute']);

function config($routeProvider) {
  $routeProvider
    .when('/', {

    })
    .others({
      redirect('/')
    });
};

angular
  .module('loc8rApp')
  .config(['$routeProvider', config]);
