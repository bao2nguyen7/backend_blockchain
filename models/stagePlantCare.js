const mongoose = require("mongoose");

const stagePlantCareSchema = new mongoose.Schema({
  name: {
    // required: true,
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  water: {
    type: String,
    required: true
  },
  fertilizer: {
    type: String,
    trim: true
  },
}, {
  collection: "stagePlantCare"
});

const stagePlantCare = mongoose.model("stagePlantCare", stagePlantCareSchema);
module.exports = stagePlantCare;