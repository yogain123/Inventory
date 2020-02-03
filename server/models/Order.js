const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  orderId: {
    type: Number,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  productId: {
    type: Number,
    required: true
  },
  totalProduct: {
    type: Number,
    required: true,
    default: 1
  }
});

module.exports = mongoose.model("order", orderSchema);
