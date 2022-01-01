require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
// const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// all routers
app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

// middlewares to handle errors
// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// add redux before moving ahead
// handle redirection after login and logout ?

// need to search for library to send sms

// place order flow
// for now cash on delivery will be supported
// place order with user's mobile number and current items
// send message to user that order is recieved

// send message to user that we have recieved his order

// order in progress ? user should be able to call delivery agent
// order delivered ? => send order delivered notification and text message

// help option for user to call owner to get help with current order
//

// offers page =>
// user should be able to see previous orders
// previous order page should show it
// when user place order

// Admin
// see Users data
// see ongoing orders with delivery executive's number
// see all previous orders

// admin can add update and delete product items
// add new product ?
// update =>

// filtering products data based on category
