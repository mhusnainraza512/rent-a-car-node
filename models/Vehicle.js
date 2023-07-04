const mongoose = require("mongoose");

const VehicleSchema = mongoose.Schema({
  vehicle_engine:{
    type: String
  },
  vehicle_year:{
    type: String
  },
  traffic_number:{
    type: String
  },
  plate_source:{
    type: String
  },
  plate_number:{
    type: String
  },
  plate_category:{
    type: String
  },
  license_issued_date:{
    type: String
  },
  license_expiry_date:{
    type: String
  },
  insurance_expiry_date:{
    type: String
  },
  insurance_provider_name:{
    type: String
  },
  chassis_number:{
    type: String
  },
  current_Odometer:{
    type: String
  },
  daily_Odometer_limit:{
    type: String
  },
  Odometer_fee_per_unit:{
    type: String
  },
  current_fuel:{
    type: String
  },
  daily_rate:{
    type: String
  },
  weekly_rate:{
    type: String
  },
  monthly_rate:{
    type: String
  },
  yearly_rate:{
    type: String
  },
  current_location:{
    type: String
  },
  current_status:{
    type: String
  },
  vehicle_category:{
    type: String
  },
  return_date: {
    type: String,
  },
  model_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Model",
    required: true,
  },
  color_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Color",
    required: true,
  },
  make_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Make",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

VehicleSchema.pre('find', function (next) {
  this.populate(['color_id', 'make_id', 'model_id']);
  next();
});

VehicleSchema.pre('findOne', function (next) {
  this.populate(['color_id', 'make_id', 'model_id']);
  next();
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
