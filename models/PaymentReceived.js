const mongoose = require("mongoose");

const PaymentReceivedSchema = mongoose.Schema({
  invoice_no:{
    type: String,
    unique: true
  },
  remaining_amount:{
    type: String
  },
  Payment_method:{
    type: String
  },
  paid_amount:{
    type: String
  },
  total_amount:{
    type: String
  },
  date: {
    type: String,
  },
  customer_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Add Customer ID"],
  },
  reservation_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Reservation",
    required: [true, "Add Reservation ID"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

PaymentReceivedSchema.pre(/^find/, function (next) {
  this.populate(['customer_id', 'reservation_id']);
  next();
});

PaymentReceivedSchema.pre('save', function (next) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // January is 0
    const formattedMonth = month < 10 ? `0${month}` : month.toString();
  
    // Generate invoice number: INV-YYYY-MM-XXXXX (e.g., INV-2023-07-00001)
    const pattern = `INV-${year}-${formattedMonth}-`;

    const PaymentReceived = this.model('PaymentReceived');
    
    // Find the highest existing invoice number
    PaymentReceived.findOne({}, 'invoice_no', { sort: { invoice_no: -1 } })
      .then((lastInvoice) => {
        let newInvoiceNo;
        if (lastInvoice) {
          const lastNumber = parseInt(lastInvoice.invoice_no.split('-').pop());
          const newNumber = lastNumber + 1;
          const formattedNumber = newNumber.toString().padStart(5, '0');
          newInvoiceNo = pattern + formattedNumber;
        } else {
          newInvoiceNo = pattern + '00001';
        }
        this.invoice_no = newInvoiceNo;
        next();
      })
      .catch((err) => {
        next(err);
      });
  });

module.exports = mongoose.model("PaymentReceived", PaymentReceivedSchema);