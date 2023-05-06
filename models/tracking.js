const mongoose = require("mongoose");

const trackingProductSchema = new mongoose.Schema(
  {
    userId:{
      type: String,
      required: true
    },
    productId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "products"
    },
    name:{
      required: true,
      type: String,
      trim: true
    },
    status:{
      required: true,
      type: Number,
      default: 0,
    },
    time:{
      required: true,
      type: String,
      trim: true
    },
    images:[{
      type: String,
      required: true
    },],
    address:{
      required: true,
      type: String,
      trim: true
    },
    detail:{
      type: String,
      trim: true
    },
    description:{
      required: true,
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