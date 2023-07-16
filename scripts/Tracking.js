const ethers = require("ethers");
require('dotenv').config();
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const ADMIN_ADDRESS = process.env.ADMIN_ADDRESS;
const fetch = require("node-fetch");

const {
    abi
} = require("./abi.json");

const url = "https://sepolia.etherscan.io/tx/";
const urlGetStatus = `https://api.etherscan.io/api?module=transaction&action=getstatus&txhash=`;

const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contractInstance = new ethers.Contract(contractAddress, abi, signer);

async function verifyProduct(id, userId, name, location, createdTime) {
    const message = ethers.utils.solidityPack(
        ['string', 'string', 'string', 'string', 'string'],
        [id, userId, name, location, createdTime]
    );

    let hash = ethers.utils.keccak256(ethers.utils.solidityPack(["string"], [message])); //variant of abi.encodePacked function in solidity

    const sig = await signer.signMessage(ethers.utils.arrayify(hash));
    // console.log("sig", sig);
    const ethHash = ethers.utils.keccak256(ethers.utils.solidityPack(["string", "bytes32"], ["\x19Ethereum Signed Message:\n32", hash]));
    // console.log("Signer Address: ", signer.address);
    const {
        v,
        r,
        s
    } = ethers.utils.splitSignature(sig);
    let bool = await contractInstance.verify(signer.address, ethHash, r, s, v);
    // console.log("Signer matched? " + bool);

    return bool;
}

async function createProduct(id, userId, name, location, createdTime) {
    const tx = await contractInstance.createProduct(ADMIN_ADDRESS, id, userId, name, location, createdTime, {
        gasLimit: 2000000,
    });

    tx.wait();
    let receipt = url + tx.hash;
    let urlStatus = urlGetStatus + tx.hash + `&apikey=` + API_KEY;
    console.log("status", urlStatus);

    let status = ""
    await fetch(urlStatus)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // Access the required properties
            status = data.status;
            const message = data.message;
            const result = data.result;

            // Access the nested properties
            const isError = result.isError;
            const errDescription = result.errDescription;

            // Use the retrieved values
            console.log("Status:", status);
            console.log("Message:", message);
            // console.log("isError:", isError);
            // console.log("errDescription:", errDescription);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    return {receipt: receipt, status: status};
}

async function getListProducts() {
    const allProducts = await contractInstance.getAllListProducts();

    const products = allProducts.map(item => ({
        pid: item.id,
        uid: item.userId,
        name: item.name,
        address: item.location,
        time: item.createdTime,
        status: (item.status)
    }));

    return JSON.parse(JSON.stringify(products));
}

async function getProduct(pid) {
    const product = await contractInstance.getProduct(pid);
    // console.log(product)
    return product;
}

async function updateProduct(pid) {
    const tx = await contractInstance.updateProduct(ADMIN_ADDRESS, pid, {
        gasLimit: 2000000,
    });

    // console.log(tx);
    tx.wait();

    let receipt = url + tx.hash;
    return receipt;
}

async function deleteProduct(pid) {
    const tx = await contractInstance.deleteProduct(ADMIN_ADDRESS, pid, {
        gasLimit: 2000000,
    });

    tx.wait();

    let receipt = url + tx.hash;
    return receipt;
}

async function deliveryProduct(productId, id, name, images, description, notes, time) {
    const tx = await contractInstance.deliveryProduct(ADMIN_ADDRESS, productId, id, name, images, description, notes, time, {
        gasLimit: 2000000,
    });

    tx.wait();
    let receipt = url + tx.hash;
    let urlStatus = urlGetStatus + tx.hash + `&apikey=` + API_KEY;
    // console.log("status tracking", urlStatus);

    let status = ""
    await fetch(urlStatus)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // Access the required properties
            status = data.status;
            console.log("Status:", status);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    return {receipt: receipt, status: status};
}


async function addTracking(productId, id, name, images, description, notes, time) {
    // console.log(productId, id, name, images, description, notes, time);

    const tx = await contractInstance.addTracking(ADMIN_ADDRESS, productId, id, name, images, description, notes, time, {
        gasLimit: 2000000
    })
    tx.wait();

    let receipt = url + tx.hash;
    let urlStatus = urlGetStatus + tx.hash + `&apikey=` + API_KEY;
    // console.log("status tracking", urlStatus);

    let status = ""
    await fetch(urlStatus)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // Access the required properties
            status = data.status;
            console.log("Status:", status);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    return {receipt: receipt, status: status};
}


async function getTracking(pid) {
    const allTrackings = await contractInstance.getTrackingList(pid.productId);

    const trackings = allTrackings.map(tracking => ({
        pid: tracking.pid,
        id: tracking.id,
        name: tracking.name,
        images: tracking.images,
        description: tracking.description,
        notes: tracking.notes,
        time: tracking.trackedTime
    }))
    return trackings;
}

module.exports.createProduct = createProduct;
module.exports.getProduct = getProduct;
module.exports.verifyProduct = verifyProduct;
module.exports.getProduct = getProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.deliveryProduct = deliveryProduct;
module.exports.getListProducts = getListProducts;
module.exports.addTracking = addTracking;
module.exports.getTracking = getTracking;