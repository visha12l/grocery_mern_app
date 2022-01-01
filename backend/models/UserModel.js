const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    },
    mobileNumber: {
      type: Number,
      required: true
    },
    cart: {
      type: Array,
      required: false
    }
  },
  {
    timestamps: true
  }
);

//we need to encrypt password everytime its saved in database
// .pre is run before saving the password
// this.isModified => it is a mangoose function

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  // generating random salt for our salt
  const salt = await bcrypt.genSalt(10);
  // here we are hasing our password value with salt
  this.password = await bcrypt.hash(this.password, salt);
});

// below method is used to check password in user login flow
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
