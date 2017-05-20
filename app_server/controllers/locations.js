module.exports.index = function (req, res, next) {
  res.render('index', { title: 'List locations' });
};

module.exports.show = function (req, res, next) {
  res.render('index', { title: 'Location details' });
};

module.exports.addReview = function (req, res, next) {
  res.render('index', { title: 'Add Review' });
};
