const mongoose = require("mongoose");

const processesSchema = new mongoose.Schema({
  userId: {
    type: String,
    trim: true
  },
  stageProcess: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stageProcess"
  },
  stagePlantSeeds: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stagePlantSeeds"
  },
  stagePlantCare: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stagePlantCare"
  },
  stageBloom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stageBloom"
  },
  stageCover: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stageCover"
  },
  stageHarvest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stageHarvest"
  },
  stageSell: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stageSell"
  }
}, {
  collection: "process"
});

const processes = mongoose.model("process", processesSchema);
module.exports = processes;