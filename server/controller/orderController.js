const Order = require("../models/Order");
const User = require("../models/UserModel");

Order.deleteMany({});
const placeOrder = async (req, res) => {
  await Order.deleteMany({});

  //TODO first check would be of jwt token
  try {
    const { totalItems, userId } = req.body;
    console.log("cartData", totalItems);
    const createOrder = await Order.create({
      customerId: userId,
      totalItems
    });
    if (createOrder) {
      const updateCart = await User.findOneAndUpdate({ _id: userId }, { cart: [] });
      if (updateCart) {
        return res.status(200).json({ orderPlaced: true });
      }
    }
  } catch (error) {
    return res.status(200).json({
      status: 400,
      message: error.message ? error.message : "Something went wrong"
    });
  }
};

const getAllOrders = async (req, res) => {
  const { userId } = req.body;
  console.log("Reached here", req.body);

  const pastOrders = await Order.find({ userId });
  console.log(pastOrders);
  if (pastOrders) {
    return res.status(200).json({ pastOrders });
  }
};

module.exports = {
  placeOrder,
  getAllOrders
};
