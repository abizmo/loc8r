var express = require('express');
var router = express.Router();
var locations = require('../controllers/locations');
var reviews = require('../controllers/reviews');

// locations list: get /api/locations/
router.get('/locations/', locations.index);
// add location: post /api/locations/
router.post('/locations/', locations.create);
// location detail: get /api/locations/:locationid
router.get('/locations/:locationId', locations.show);
// location update: put /api/locations/:locationid
router.put('/locations/:locationId', locations.update);
// location delete: delete /api/locations/:locationid
router.delete('/locations/:locationId', locations.delete);
// review detail: get /api/locations/:locationid/reviews/:reviewId
router.get('/locations/:locationId/reviews/:reviewId', reviews.show);
// add review: post /api/locations/:locationid/reviews
router.post('/locations/:locationId/reviews', reviews.create);
// update review: put /api/locations/:locationid/reviews/:reviewid
router.put('/locations/:locationId/reviews/:reviewId', reviews.update);
// review delete: delete /api/locations/:locationid/reviews/:reviewid
router.delete('/locations/:locationId/reviews/:reviewId', reviews.delete);

module.exports = router;
