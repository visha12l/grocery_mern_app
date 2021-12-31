const jwt = require("jsonwebtoken");
const jwtSecret = require("crypto").randomBytes(64).toString("hex");
// get config vars
const generateToken = id => {
  return jwt.sign({ id }, "test123", {
    expiresIn: "30d"
  });
};

module.exports = generateToken;
