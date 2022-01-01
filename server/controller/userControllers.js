const User = require("../models/UserModel");
const generateToken = require("../utils/generateToken");
const registerUser = async (req, res) => {
  // TODO :: send to user on his mobile number
  try {
    const { name, email, password, mobileNumber, isAdmin } = req.body;
    const userExists = await User.findOne({ email });
    // check if user already exist in db
    // if it is present in db throw error of already exists with status code
    if (userExists) {
      throw new Error("User already exists.");
    }
    // if user does not exist then go ahead and create it
    const createUser = await User.create({
      name,
      email,
      password,
      mobileNumber,
      isAdmin
    });
    if (createUser) {
      // return user data to frontend
      return res.status(201).json({
        _id: createUser._id,
        name: createUser.name,
        isAdmin: createUser.isAdmin
      });
    } else {
      throw new Error("User already exists.");
    }
  } catch (error) {
    return res.status(200).json({
      status: 400,
      message: error.message ? error.message : "Something went wrong"
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // check if user already exist in db
    // if it is present in db then return user token with other required data
    if (user) {
      // check if password is also correct
      if (await user.matchPassword(password)) {
        // return required user data to frontend
        console.log("USERData", user);
        return res.status(201).json({
          _id: user._id,
          name: user.name,
          isAdmin: user.isAdmin,
          cart: user.cart,
          token: generateToken(user._id)
        });
      } else {
        throw new Error("Password is incorrect");
      }
    } else {
      throw new Error("Email id does not exist");
    }
  } catch (error) {
    return res.status(200).json({
      status: 400,
      message: error.message ? error.message : "Something went wrong"
    });
  }
};

const updateUserCart = async (req, res) => {
  try {
    const { id, cart } = req.body;
    const updateCart = await User.findOneAndUpdate({ _id: id }, { cart: cart });
    console.log("updateData", updateCart);
    if (updateCart) {
      return res.status(201).json({
        _id: updateCart._id,
        cart: updateCart.cart
      });
    }
  } catch (error) {
    return res.status(200).json({
      status: 400,
      message: error.message ? error.message : "Something went wrong"
    });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      return res.status(201).json({ cart: user.cart });
    }
  } catch (error) {
    return res.status(200).json({
      status: 400,
      message: error.message ? error.message : "Something went wrong"
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUserCart,
  getUserCart
};
