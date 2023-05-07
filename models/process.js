const mongoose = require("mongoose");

const processesSchema = new mongoose.Schema(
  {
    userId:{
      type: String,
      trim: true
    },
    name:{
      required: true,
      type: String,
      trim: true
    },
    images:[{
      type: String,
      required: true
    },],
    pId:{ type: String, unique: true, index: true, sparse:true},
    time:{
      type: String,
      trim: true
    },
    description:{
      type: String,
      trim: true
    }
  },
  {
    collection: "processes"
  }
);

const processes = mongoose.model("process", processesSchema);
module.exports = processes; 