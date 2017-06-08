var express = require('express');
var router = express.Router();
var locations = require('../controllers/locations');
var others = require('../controllers/others');

// Locations URL
router.get('/', locations.index);
router.get('/locations/:locationId', locations.show);
router.get('/locations/:locationId/reviews/new', locations.addReview);
router.post('/locations/:locationId/reviews/new', locations.createReview);

// Others URL
router.get('/about/', others.about);

module.exports = router;
