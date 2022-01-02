require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");
connectDB();
const PORT = process.env.PORT || 5000;

console.log("Reached here");
const app = express();
app.use(cors({ origin: "*" }));
// this package is used to parse req body
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*'
}));
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
