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

const ethers = require("ethers");
// const API_URL = process.env.API_URL;
const API_URL = "HTTP://127.0.0.1:7545";
const PRIVATE_KEY = "bfccf6bbbc30bdf65f99fc5505f395c9fbd1f7d136b76be38a3f07cb39e30ac9";
const contractAddress = "0xc1f239C3c77a7FD3126Ad3232C2042c5cCAFdE1D";
const ADMIN_ADDRESS = "0x1ffC366b4626c0597216a6Df0AC1b4C87a30EB70";

// connect to smart contract
const {
  abi
} = require("./scripts/abi.json");

const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contractInstance = new ethers.Contract(contractAddress, abi, signer);

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