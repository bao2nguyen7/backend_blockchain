const mongoose = require("mongoose");

const trackingProductSchema = new mongoose.Schema(
  {
    trackingId:{
      type: String,
      required: true 
    },
    productId:{
      type: String,
      required: true 
    },
    name:{
      required: true,
      type: String,
      trim: true
    },
    notes:[{
      type: String,
      trim: true 
    }],
    time:{
      required: true,
      type: String,
      trim: true
    },
    images:[{
      type: String,
      required: true
    },],
    description:{
      required: true,
      type: String,
      trim: true
    },
    url:{
      type: String,
      trim: true
    }
  },
  {
    collection: "tracking"
  }
);

const tracking = mongoose.model("tracking", trackingProductSchema);
module.exports = tracking;