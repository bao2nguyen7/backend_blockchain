const mongoose = require("mongoose");

const stageHarvestSchema = new mongoose.Schema({
  name: {
    // required: true,
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  quantity: {
    type: String,
    trim: true
  },
}, {
  collection: "stageHarvest"
});

const stageHarvest = mongoose.model("stageHarvest", stageHarvestSchema);
module.exports = stageHarvest;