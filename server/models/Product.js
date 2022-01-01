const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  discountPercentage: {
    type: Number,
    required: true
  }
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
