const mongoose = require("mongoose");

const processesSchema = new mongoose.Schema({
  userId: {
    type: String,
    trim: true
  },
  stageProcess: {
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
  },
  stagePlantSeeds: {
    name: {
      type: String,
      trim: true,
      // required: true
    },
    description: {
      type: String,
      trim: true,
      // required: true
    }
  },
  stagePlantCare: {
    name: {
      type: String,
      trim: true,
      // required: true
    },
    description: {
      type: String,
      trim: true,
      // required: true
    },
    labelWater: {
      type: String,
      trim: true,
    },
    descriptionWater: {
      type: String,
      trim: true,
      // required: true
    },
    labelFertilizer: {
      type: String,
      trim: true,
      // required: true
    },
    descriptionFertilizer: {
      type: String,
      trim: true,
      // required: true
    },
  },
  stageBloom: {
    name: {
      type: String,
      trim: true,
      // required: true
    },
    description: {
      type: String,
      trim: true,
      // required: true
    },
  },
  stageCover: {
    name: {
      type: String,
      trim: true,
      // required: true
    },
    description: {
      type: String,
      trim: true,
      // required: true
    },
  },
  stageHarvest: {
    name: {
      type: String,
      trim: true,
      // required: true
    },
    description: {
      type: String,
      trim: true,
      // required: true
    },
    labelQuantity: {
      type: String,
      trim: true,
      // required: true
    },
    descriptionQuantity: {
      type: String,
      trim: true,
      // required: true
    },
  },
  stageSell: {
    name: {
      type: String,
      trim: true,
      // required: true
    },
    description: {
      type: String,
      trim: true,
      // required: true
    },
    labelPurchasingUnit: {
      type: String,
      trim: true,
      // required: true
    },
    descriptionPurchasingUnit: {
      type: String,
      trim: true,
      // required: true
    },
  }
}, {
  collection: "processes"
});

const processes = mongoose.model("process", processesSchema);
module.exports = processes;