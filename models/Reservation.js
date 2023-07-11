const mongoose = require("mongoose");

const ReservationSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  pickup_location: {
    type: String,
  },
  pickup_date: {
    type: String,
  },
  return_location: {
    type: String,
  },
  return_date: {
    type: String,
  },
  acriss_car_code: {
    type: String,
  },
  vehicle_category: {
    type: String,
  },
  rate: {
    type: String,
  },
  rate_type: {
    type: String,
  },
  reservation_status: {
    type: String,
  },
  reference: {
    type: String,
  },
  notes: {
    type: String,
  },
  customer_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: false,
  },
  vehicle_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ReservationSchema.pre(/^find/, function (next) {
  this.populate(['customer_id','vehicle_id']);
  next();
});

module.exports = mongoose.model("Reservation", ReservationSchema);