(function () {
  angular
    .module('loc8rApp')
    .filter('formatDistance', formatDistance);

  function formatDistance() {
    return function (distance) {
      if (distance >= 1000) {
        return parseFloat(distance/1000).toFixed(1) + " Km";
      } else {
        return parseInt(distance) + " m";
      }
    };
  };
})();
