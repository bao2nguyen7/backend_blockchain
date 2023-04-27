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
    }
  },
  {
    collection: "products"
  }
);

const products = mongoose.model("products", productsSchema);
module.exports = products; 