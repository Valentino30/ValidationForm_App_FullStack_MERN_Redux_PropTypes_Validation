const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  personalNumber: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
