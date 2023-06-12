const mongoose = require("mongoose");

const trackingProductSchema = new mongoose.Schema(
  {
    productId:{
      type: String,
      required: true 
    },
    name:{
      required: true,
      type: String,
      trim: true
    },
    // status:{
    //   required: true,
    //   type: Number,
    //   default: 0,
    // },
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