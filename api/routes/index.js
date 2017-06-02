var express = require('express');
var router = express.Router();
var locations = require('../controllers/locations');
var reviews = require('../controllers/reviews');
var times = require('../controllers/times');

// LOCATIONS ROUTES
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

// REVIEWS ROUTES
// review detail: get /api/locations/:locationid/reviews/:reviewId
router.get('/locations/:locationId/reviews/:reviewId', reviews.show);
// add review: post /api/locations/:locationid/reviews
router.post('/locations/:locationId/reviews', reviews.create);
// update review: put /api/locations/:locationid/reviews/:reviewid
router.put('/locations/:locationId/reviews/:reviewId', reviews.update);
// review delete: delete /api/locations/:locationid/reviews/:reviewid
router.delete('/locations/:locationId/reviews/:reviewId', reviews.delete);

// TIMES ROUTES
// time detail: get /api/locations/:locationid/times/:timeId
router.get('/locations/:locationId/times/:timeId', times.show);
// add time: post /api/locations/:locationid/times
router.post('/locations/:locationId/times', times.create);
// update time: put /api/locations/:locationid/times/:timeid
router.put('/locations/:locationId/times/:timeId', times.update);
// time delete: delete /api/locations/:locationid/times/:timeid
router.delete('/locations/:locationId/times/:timeId', times.delete);

module.exports = router;
