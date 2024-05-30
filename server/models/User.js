const mongoose = require("mongoose");

// Check if the model has already been defined
let User;
try {
  User = mongoose.model("User");
} catch (error) {
  // Define the model if it hasn't been defined already
  const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });

  User = mongoose.model("User", userSchema);
}

module.exports = User;
