module.exports.index = function (req, res, next) {
  res.render('locationIndex', { title: 'List locations' });
};

module.exports.show = function (req, res, next) {
  res.render('locationShow', { title: 'Location details' });
};

module.exports.addReview = function (req, res, next) {
  res.render('locationAddReview', { title: 'Add Review' });
};
