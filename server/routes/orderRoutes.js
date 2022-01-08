const express = require("express");
const router = express.Router();
const { placeOrder, getAllOrders } = require("../controller/orderController");

router.post("/placeOrder", placeOrder);
router.get("/allOrder", getAllOrders);
module.exports = router;
