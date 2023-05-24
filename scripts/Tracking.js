const ethers = require("ethers")
require('dotenv').config();
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const ADMIN_ADDRESS = process.env.ADMIN_ADDRESS;

const {
    abi
} = require("./abi.json");

const url = "https://sepolia.etherscan.io/tx/";

const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contractInstance = new ethers.Contract(contractAddress, abi, signer);

async function createProduct(pid, uid) {
    const tx = await contractInstance.createProduct(pid, uid, {
        gasLimit: 300000,
    });

    tx.wait();

    let receipt = url + tx.hash;
    return receipt;
}

async function getAllListProducts() {
    const allProducts = await contractInstance.getAllListProducts();

    const products = allProducts.map(item => ({
        pid: item.id,
        tracking: item.trackingList,
    }));

    return JSON.stringify(products);
}

async function getOneProduct(pid, uid) {
    const product = await contractInstance.getProductID(uid, pid);

    return JSON.stringify(product);
}

async function addTracking(pid, uid, id, name, address, time) {
    const tx = await contractInstance.addTracking(ADMIN_ADDRESS, pid, uid, id, name, address, parseInt(time), {
        gasLimit: 500000
    })

    tx.wait();

    let receipt = url + tx.hash;

    return receipt;
}


async function getTracking(uid) {
    const allTrackings = await contractInstance.getTrackingList(uid);

    const trackings = allTrackings.map(tracking => ({
        pid: tracking.pid,
        uid: tracking.uid,
        id: tracking.id,
        name: tracking.name,
        location: tracking.location,
        time: new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(tracking.trackedTime)
    }))
    return trackings;
}

module.exports.createProduct = createProduct;
module.exports.getOneProduct = getOneProduct;
module.exports.getAllListProducts = getAllListProducts;
module.exports.addTracking = addTracking;
module.exports.getTracking = getTracking;