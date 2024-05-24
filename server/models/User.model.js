const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required.']
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    name: {
      type: String,
      required: [true, 'Name is required.']
    }
  }
);

const User = model("User", userSchema);

module.exports = User;