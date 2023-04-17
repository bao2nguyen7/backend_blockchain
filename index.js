//Import orther file
const authenRouter = require("./routes/authentication");
const productRouter = require("./routes/product");



//Import library
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());





//Connect Mongoose

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser:true
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));
//middleware server
app.use(authenRouter);
app.use(productRouter);







// require("./models/product");
// const products = mongoose.model("products");

// app.post("/createqr", async(req, res) => {
//   const {id,pId,name,time,address,image,description} = req.body;

//   try {
//     // const oldProduct = await products.findOne({id,pId});
//     // if(oldProduct) {
//     //   return res.send({ error: "Product Exists"})
//     // }
//     // await
//     products.create({
//       id,
//       pId,
//       name,
//       time,
//       address,
//       image,
//       description
//     });
//     res.send({status: "OK"})
//   } catch (error) {
//     res.send({ status: "Error"})
//   }
// })

// require("./list");
// const list = mongoose.model("list");

// app.get("/list", async(req, res) => {
//   try {
//     const productItem = await list.find (); 
//     res.send({ status: "Ok", data: productItem });
//   } catch (error) {
//     console.log(error)
//   }
// })

app.listen(process.env.PORT, () => {
  console.log(`Server is starting ... ${process.env.PORT}`);
});