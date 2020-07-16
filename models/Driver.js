const mongoose = require('mongoose');

// Driver Schema
const driverSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    masjid_location: {
      type: Array,
      required: true,
    },
    time_leaving: {
      type: String,
      required: true,
    },
    jumma_timings: {
      type: String,
      required: true,
    },
    current_location: {
      type: Array,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    radius_in_miles: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
); //Created at and Updated at feild automatly generated

module.exports = mongoose.model('Driver', driverSchema);
