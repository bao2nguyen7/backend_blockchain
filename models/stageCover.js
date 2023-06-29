const mongoose = require("mongoose");

const stageCoverSchema = new mongoose.Schema({
  name: {
    // required: true,
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
}, {
  collection: "stageCover"
});

const stageCover = mongoose.model("stageCover", stageCoverSchema);
module.exports = stageCover;