const mongoose = require("mongoose");

const ColorSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Color", ColorSchema);
