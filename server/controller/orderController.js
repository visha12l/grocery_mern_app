const Order = require("../models/Order");
const User = require("../models/UserModel");

const placeOrder = async (req, res) => {
  //TODO first check would be of jwt token
  try {
    const { cartData, userId } = req.body;
    const createOrder = await Order.create({
      customerId: userId,
      totalItems: cartData
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

const getAllOrders = (req, res) => {};

module.exports = {
  placeOrder,
  getAllOrders
};
