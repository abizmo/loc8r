var mongoose = require('mongoose');

var openingDaySchema = new mongoose.Schema({
  days: { type: String,
          required: true },
  opening: String,
  closing: String,
  closed: { type: Boolean,
            required: true}
});

var reviewSchema = new mongoose.Schema({
  rating: { type: Number,
            required: true,
            min: 0,
            max: 5 },
  author: { type: String,
            required: true },
  createOn: { type: Date,
          "default": Date.now},
  reviewText: { type: String,
                required: true }
});

var locationSchema = new mongoose.Schema({
  name: { type: String,
          required: true },
  rating: { type: Number,
            "default": 0,
            min: 0,
            max: 5 },
  coords: { type: [Number], index: '2dsphere'},
  address: String,
  facilities: [String],
  openingHours: [openingDaySchema],
  reviews: [reviewSchema]
});

mongoose.model('Location', locationSchema);
