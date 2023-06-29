const mongoose = require("mongoose");

const stageProcessSchema = new mongoose.Schema({
  name: {
    // required: true,
    type: String,
    trim: true
  },
  images: [{
    type: String,
    required: true
  }, ],
  timeCreate: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
}, {
  collection: "stageProcess"
});

const stageProcess = mongoose.model("stageProcess", stageProcessSchema);
module.exports = stageProcess;