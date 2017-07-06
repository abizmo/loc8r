angular
  .module('loc8rApp')
  .directive('ratingStars', ratingStars);

function ratingStars() {
  return {
    restric: 'EA',
    scope: {
      thisRating: '=rating'
    },
    templateUrl: "/common/directives/ratingStars/ratingStars.html"
  };
};
