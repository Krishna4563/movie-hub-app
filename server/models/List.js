const mongoose = require("mongoose");

// Check if the model has already been defined
let List;
try {
  List = mongoose.model("List");
} catch (error) {
  // Define the model if it hasn't been defined already
  const listSchema = new mongoose.Schema({
    Title: {
      type: String,
      required: true,
    },
  });

  List = mongoose.model("List", listSchema);
}

module.exports = List;
