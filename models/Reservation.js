const mongoose = require("mongoose");

const ReservationSchema = mongoose.Schema({
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
    required: true,
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

module.exports = mongoose.model("Reservation", ReservationSchema);
