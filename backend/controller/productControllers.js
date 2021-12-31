const Product = require("../models/Product");
const jwt = require("jsonwebtoken");

const getProducts = async (req, res) => {
  try {
    const bearer = req.headers["authorization"].split(" ");
    const bearerToken = bearer[1];
    console.log("bearerToken", bearerToken);
    jwt.verify(bearerToken, "test123", async (err, decoded) => {
      if (err) {
        throw new Error("Token expired.");
      } else {
        const products = await Product.find({});
        res.json(products);
      }
    });
  } catch (error) {
    return res.status(200).json({
      status: 400,
      message: error.message ? error.message : "Something went wrong"
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getProducts,
  getProductById
};
