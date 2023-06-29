const mongoose = require("mongoose");

const stageSellSchema = new mongoose.Schema({
  name: {
    // required: true,
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  purchasingUnit: {
    type: String,
    trim: true
  },
}, {
  collection: "stageSell"
});

const stageSell = mongoose.model("stageSell", stageSellSchema);
module.exports = stageSell;