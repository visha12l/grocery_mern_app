const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    totalItems: {
      type: Array,
      required: true
    },
    paymentType: { type: String, default: "Cash" },
    status: { type: String, default: "Order_Placed" }
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
