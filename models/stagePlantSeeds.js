const mongoose = require("mongoose");

const stagePlantSeedsSchema = new mongoose.Schema({
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
  collection: "stagePlantSeeds"
});

const stagePlantSeeds = mongoose.model("stagePlantSeeds", stagePlantSeedsSchema);
module.exports = stagePlantSeeds;