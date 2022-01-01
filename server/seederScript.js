require("dotenv").config();
const productData = require("./data/products");
const userData = require("./data/users");
const connectDB = require("./config/db");
const Product = require("./models/Product");
const User = require("./models/UserModel");
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(productData);
    await User.insertMany(userData);
    console.log("Data import success");
    process.exit();
  } catch (error) {
    console.error("ERROR with data import");
    process.exit(1);
  }
};

importData();
