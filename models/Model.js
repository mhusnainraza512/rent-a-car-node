const mongoose = require("mongoose");

const ModelSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  make_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Make",
    required: true,
  }
});

module.exports = mongoose.model("Model", ModelSchema);
