const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, "First name is required"] },
  lastName: { type: String, required: [true, "Last name is required"] },
  mobileNo: {
    type: String,
    required: [true, "Mobile number is required"],
    match: [/^[0-9]{10}$/, "Mobile number must be 10 digits"],
  },
  emailId: {
    type: String,
    required: [true, "Email is required"],
    match: [/\S+@\S+\.\S+/, "Email format is invalid"],
  },
  address: {
    street: { type: String, required: [true, "Street is required"] },
    city: { type: String, required: [true, "City is required"] },
    state: { type: String, required: [true, "State is required"] },
    country: { type: String, required: [true, "Country is required"] },
  },
  loginId: {
    type: String,
    required: [true, "Login ID is required"],
    match: [/^[a-zA-Z0-9]{8,}$/, "Login ID must be at least 8 characters"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must be at least 6 characters, include one uppercase letter, one lowercase letter, one number, and one special character",
    ],
  },
  creationTime: { type: Date, default: Date.now },
  lastUpdatedOn: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
