const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a owner name"],
  },
  company: {
    type: String,
    unique: true,
    required: [true, "Please add a company name"],
  },
  address: {
    type: String,
    required: [true, "Please add a address"],
  },
  postcode: {
    type: String,
    required: [true, "Please add a postal code"],
  },
  city: {
    type: String,
    required: [true, "Please add a city name"],
  },
  state: {
    type: String,
    required: [true, "Please add a state name"],
  },
  phone1: {
    type: String,
    required: [true, "Please add a phone1"],
  },
  phone2: {
    type: String,
    required: [true, "Please add a phone2"],
  },
  email: {
    type: String,
    required: [true, "Please add a company email"],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  license: {
    type: String,
    required: [true, "Please add a licence no"],
  },
  comment: {
    type: String,
  },
  is_active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

CompanySchema.pre(/^find/, function (next) {
  this.populate(['user']);
  next();
});

module.exports = mongoose.model("Company", CompanySchema);
