//Import orther file
const authenRouter = require("./routes/authentication");
const productRouter = require("./routes/product");
const trackingRouter = require("./routes/tracking");
const processRouter = require("./routes/process");


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
app.use(trackingRouter);
app.use(processRouter);



// exports.contractInstance = contractInstance;

app.listen(process.env.PORT, () => {
  console.log(`Server is starting ... ${process.env.PORT}`);
});