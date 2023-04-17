const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    id:{
      required: true,
      type: String,
      trim: true
    },
    name:{
      required: true,
      type: String,
      trim: true
    },
    pId:{ type: String, unique: true, index: true, sparse:true},
    status:{
      required: true,
      type: Boolean,
      trim: true
    },
    time:{
      required: true,
      type: String,
      trim: true
    },
    image:[{
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
      type: String,
      trim: true
    }
  },
  {
    collection: "products"
  }
);

const products = mongoose.model("product", productsSchema);
module.exports = products; 