const mongoose = require("mongoose");

const WalletSchema = mongoose.Schema({
  balance: {
    type: String
  },
  customer_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Add Customer ID"],
  },
  reservation_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Reservation",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Wallet", WalletSchema);
