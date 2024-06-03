const mongoose = require("mongoose");

let List;
try {
  List = mongoose.model("List");
} catch (error) {
  const listSchema = new mongoose.Schema({
    Title: {
      type: String,
      required: true,
    },
  });

  List = mongoose.model("List", listSchema);
}

module.exports = List;
