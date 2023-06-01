const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    userId:{
      type: String,
      required: true
    },
    name:{
      required: true,
      type: String,
      trim: true
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
    description:{
      type: String,
      trim: true
    },
    url:{
      type: String,
      trim: true
    },
    status:{
      type: Number,
      trim: true
    },
    tracking: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tracking"
      }
    ]
  },
  {
    collection: "products"
  }
);

const products = mongoose.model("products", productsSchema);
module.exports = products; 