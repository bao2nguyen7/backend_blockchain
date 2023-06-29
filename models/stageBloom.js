const mongoose = require("mongoose");

const stageBloomSchema = new mongoose.Schema({
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
  collection: "stageBloom"
});

const stageBloom = mongoose.model("stageBloom", stageBloomSchema);
module.exports = stageBloom;