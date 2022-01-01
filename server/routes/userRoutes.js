const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUserCart,
  getUserCart
} = require("../controller/userControllers");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/cart", updateUserCart);
router.get("/cart/:id", getUserCart);

module.exports = router;
