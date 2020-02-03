const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  productId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  totalProduct: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("inventory", inventorySchema);
