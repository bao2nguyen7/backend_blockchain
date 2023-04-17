const mongoose = require("mongoose");

const listProductSchema = new mongoose.Schema(
  {
    id:{
      required: true,
      type: Number,
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
    image:{
      type: String,
    },
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
    collection: "list"
  }
);

const list = mongoose.model("list", listProductSchema);
module.exports = list;