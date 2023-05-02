const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name:{
      required: true,
      type: String,
      trim: true
    },
    email:{
      required: true,
      type: String,
      trim: true,
      validate: {
        validator: (value) =>{
          const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          return value.match(re);
          },
          message: "Please enter a valid email address"
          
      }
    },
    password:{
      required: true,
      type: String,
      
    },
    userType: {
      type: String,
      default: "user",
    },
    products:[
      {
        type: mongoose.Schema.Types.Map,
        ref: "products"
      }
    ]
    // list: {type: mongoose.Types.ObjectId, ref: "list"}
  },
  {
    collection: "userAccount"
  }
);

const userAccount = mongoose.model("userAccount", userSchema);
module.exports = userAccount;