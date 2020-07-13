const mongoose = require('mongoose');

// Masjid Schema
const masjidProfileSchema = mongoose.Schema(
  {
    masjid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    city: {
      type: String,
      trim: true,
      default: '',
    },
    address: {
      type: String,
      trim: true,
      default: '',
    },
    website: {
      type: String,
      trim: true,
      default: '',
    },
    jummahTimes: {
      type: Array,
      default: [],
    },
    avaliableRides: {
      type: Array,
      default: [],
    },
    setup: {
      type: String,
      default: 'false',
    },
  },
  { timestamps: true }
); //Created at and Updated at feild automatly generated

module.exports = mongoose.model('Masjid Profile', masjidProfileSchema);
