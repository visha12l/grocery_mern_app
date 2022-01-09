const express = require("express");
const router = express.Router();
const { placeOrder, getAllOrders } = require("../controller/orderController");

router.post("/placeOrder", placeOrder);
router.post("/getOrders", getAllOrders);

module.exports = router;
