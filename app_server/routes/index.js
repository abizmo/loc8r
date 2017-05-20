var express = require('express');
var router = express.Router();
var locations = require('../controllers/locations');
var others = require('../controllers/others');

// Locations URL
router.get('/', locations.index);
router.get('/location/', locations.show);
router.get('/location/review/new', locations.addReview);

// Others URL
router.get('/about/', others.about);

module.exports = router;
