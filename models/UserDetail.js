const mongoose = require("mongoose");

const UserDetailSchema = mongoose.Schema({
  profiletype: {
    type: String,
  },
  profilecategory: {
    type: String,
  },
  preferredlang: {
    type: String,
  },
  name_eng: {
    type: String,
  },
  name_ar: {
    type: String,
  },
  national_no: {
    type: String,
  },
  identity_card: {
    type: String,
  },
  identity_issue_date: {
    type: String,
  },
  identity_expiry_date: {
    type: String,
  },
  gender: {
    type: String,
  },
  nationality: {
    type: String,
  },
  vist_visa_no: {
    type: String,
  },
  dob: {
    type: String,
  },
  pob: {
    type: String,
  },
  phone: {
    type: String,
  },
  driving_license: {
    type: String,
  },
  driving_license_issue_by: {
    type: String,
  },
  driving_license_issue_date: {
    type: String,
  },
  driving_license_expiry_date: {
    type: String,
  },
  home_address: {
    type: String,
  },
  home_phone: {
    type: String,
  },
  pobox: {
    type: String,
  },
  work_address: {
    type: String,
  },
  mobile_no: {
    type: String,
  },
  profession: {
    type: String,
  },
  work_phone: {
    type: String,
  },
  passport_no: {
    type: String,
  },
  passport_issue_date: {
    type: String,
  },
  passport_expiry_date: {
    type: String,
  },
  mother_name: {
    type: String,
  },
  category: {
    type: String,
  },
  marketing_preference: {
    type: String,
  },
  tax_treatment: {
    type: String,
  },
  trn: {
    type: String,
  },
  sop_vat: {
    type: String,
  },
  image: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("UserDetail", UserDetailSchema);
