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

async function createProduct(pid, uid, name, address) {
    const tx = await contractInstance.createProduct(ADMIN_ADDRESS, pid, uid, name, address, {
        gasLimit: 300000,
    });

    // console.log(tx);

    tx.wait();

    let receipt = url + tx.hash;
    return receipt;
}

async function getListProducts() {
    const allProducts = await contractInstance.getAllListProducts();

    const products = allProducts.map(item => ({
        pid: item.id,
        uid: item.uid,
        address: item.location,
        status: parseInt(item.status)
    }));
    // console.log(products); 
    return JSON.stringify(products);
}

async function getProduct(pid) {
    const product = await contractInstance.getProduct(pid);
    // console.log(product)
    return JSON.stringify(product);
}

async function updateProduct(pid) {
    const tx = await contractInstance.updateProduct(ADMIN_ADDRESS, pid, {
        gasLimit: 300000,
    });

    tx.wait();

    let receipt = url + tx.hash;
    return receipt;
}

async function deleteProduct(pid) {
    const tx = await contractInstance.deleteProduct(ADMIN_ADDRESS, pid, {
        gasLimit: 300000,
    });

    tx.wait();

    let receipt = url + tx.hash;
    return receipt;
}

async function deliveryProduct(pid) {
    const tx = await contractInstance.deliveryProduct(ADMIN_ADDRESS, pid, {
        gasLimit: 300000,
    });

    tx.wait();

    let receipt = url + tx.hash;
    return receipt;
}


async function addTracking(pid, uid, id, name, address, time) {
    const tx = await contractInstance.addTracking(ADMIN_ADDRESS, pid, uid, id, name, address, parseInt(time), {
        gasLimit: 500000
    })

    tx.wait();

    let receipt = url + tx.hash;

    return receipt;
}


async function getTracking(pid) {
    const allTrackings = await contractInstance.getTrackingList(pid);

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
module.exports.getProduct = getProduct;
module.exports.getProduct = getProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.deliveryProduct = deliveryProduct;
module.exports.getListProducts = getListProducts;
module.exports.addTracking = addTracking;
module.exports.getTracking = getTracking;