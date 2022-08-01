const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: Number,
    required: true,
  },
  cvv: {
    type: Number,
    required: true,
  },
  expDate: {
    type: Date,
    required: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
