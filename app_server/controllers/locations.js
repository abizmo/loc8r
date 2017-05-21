module.exports.index = function (req, res, next) {
  locations = [{ name: 'Starcups',
                rating: 3,
                distance: '50m',
                address: '125 High Street, Reading, RG6 1PS',
                facilities: [ 'Hot drinks', 'Food', 'Wifi Premium'] },
              { name: 'Starcups',
                rating: 1,
                distance: '100m',
                address: '125 High Street, Reading, RG6 1PS',
                facilities: [ 'Hot drinks', 'Food', 'Wifi Premium'] },
              { name: 'Starcups',
                rating: 5,
                distance: '300m',
                address: '125 High Street, Reading, RG6 1PS',
                facilities: [ 'Hot drinks', 'Food', 'Wifi Premium'] }];

  res.render('locationIndex', { title: 'Loc8r - Locations',
                                pageHeader: { title: 'Loc8r',
                                                small: 'Find places to work with wifi near to you!' },
                                locations: locations,
                                sidebar: "Looking for wifi and seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for." });
};

module.exports.show = function (req, res, next) {
  location = { name: 'Starcups',
              rating: 3,
              distance: '50m',
              address: '125 High Street, Reading, RG6 1PS',
              coords: { lat: 51.455041, lon: -0.9690884 },
              facilities: [ 'Hot drinks', 'Food', 'Wifi Premium'],
              hours: [{
                days: 'Monday - Friday',
                opening: '7:00am',
                closing: '7:00pm',
                closed: false
              }, {
                days: 'Saturday',
                opening: '8:00am',
                closing: '5:00pm',
                closed: false
              }, {
                days: 'Sunday',
                closed: true
              }],
              reviews: [{
                rating: 3,
                author: 'Simon Holmes',
                date: '16 July 2013',
                content: "What a great place. I can't say enough good things about it."
                }, {
                rating: 2,
                author: 'Simon Holmes',
                date: '16 July 2015',
                content: "What a great place. I can't say enough good things about it."
                }, {
                rating: 4,
                author: 'Simon Holmes',
                date: '16 July 2017',
                content: "What a great place. I can't say enough good things about it." }]};

  res.render('locationShow', { title: 'Loc8r - ' + location.name,
                                location: location,
                                sidebar: {
                                  context: "is on Loc8r because it has accesible wifi and space to sit down with your laptop and get some work done.",
                                  cta: "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
                                }});
};

module.exports.addReview = function (req, res, next) {
  name = 'Starcups';
  res.render('locationAddReview', { title: 'Loc8r - Add Review',
                                    pageHeader: { title: 'Review ' + name } } );
};
