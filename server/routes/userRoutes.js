const express = require("express");
const router = express.Router();
const {
  sendOtp,
  verifyOtp,
  registerUser,
  loginUser,
  updateUserCart,
  getUserCart
} = require("../controller/userControllers");

router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/cart", updateUserCart);
router.get("/cart/:id", getUserCart);

module.exports = router;
