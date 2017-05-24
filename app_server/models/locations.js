const mongoose = require('mongoose');

const openingDaySchema = new mongoose.Schema({
  days: { type: String,
          required: true },
  opening: String,
  closing: String,
  closed: { type: Boolean,
            required: true}
});

const reviewSchema = new mongoose.Schema({
  rating: { type: Number,
            "default": 0,
            min: 0,
            max: 5 },
  author: { type: String,
            required: true },
  createOn: { type: Date,
          "default": Date.now},
  reviewText: String
});

const locationSchema = new mongoose.Schema({
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

const Location = mongoose.model('Location', locationSchema);



// rating: 3,
// author: 'Simon Holmes',
// date: '16 July 2013',
// content: "What a great place. I can't say enough good things about it."
