const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(6);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
