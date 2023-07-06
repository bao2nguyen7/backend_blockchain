const Tracking = require('../models/tracking');
const Product = require('../models/product');
const User = require('../models/user');
const {
    addTracking,
    getTracking,
    deliveryProduct
} = require('../scripts/Tracking')
const uniqid = require('uniqid');


const trackingController = {
    // addTracking
    addTracking: async (req, res) => {
        try {
            const id = uniqid();
            console.log("tracking id", id);
            const {
                name,
                images,
                description,
                time,
                notes
            } = req.body;
            const pid = req.params.id;


            // console.log(pid,  saveTracking.id, name, images, description, notes, time);

            const receipt = await addTracking(pid, id, name, images, description, notes, time);
            // console.log(receipt.receipt);

            let saveTracking;
            if (receipt.status === "1") {
                let newTracking = new Tracking({
                    trackingId: id,
                    productId: pid,
                    name,
                    images,
                    description,
                    time,
                    notes,
                    url: receipt.receipt
                });
                saveTracking = await newTracking.save();
                // console.log("URL: ", saveTracking);

                const product = await Product.findOne({
                    productId: saveTracking.productId
                });
                // console.log("product", product);

                await product.updateOne({
                    $push: {
                        tracking: saveTracking.id
                    }
                });

            }
            return res.json({
                success: true,
                receipt: receipt,
                data: saveTracking,
                message: "Tracking added successfully"
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                error: e.message
            });
        }
    },
    //getTracking
    getTracking: async (req, res) => {
        try {
            const tracking = await Tracking.find();
            const track = await getTracking({
                productId: req.params.id
            });
            // console.log(track);

            res.status(200).json({
                success: true,
                dataSC: track,
                data: tracking,
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                error: e.message
            });
        }
    },
    deliveried: async (req, res) => {
        try {
            const id = uniqid();
            console.log("tracking id", id);
            const {
                name,
                images,
                description,
                time,
                notes
            } = req.body;
            const pid = req.params.id;


            // console.log(pid,  saveTracking.id, name, images, description, notes, time);

            const receipt = await deliveryProduct(pid, id, name, images, description, notes, time);
            // console.log(receipt.status);

            let saveTracking;
            if (receipt.status === "1") {
                let newTracking = new Tracking({
                    trackingId: id,
                    productId: pid,
                    name,
                    images,
                    description,
                    time,
                    notes,
                    url: receipt.receipt
                });
                saveTracking = await newTracking.save();
                // console.log("URL: ", saveTracking);

                const product = await Product.findOne({
                    productId: saveTracking.productId
                });
                console.log("product", product);

                await product.updateOne({
                    $push: {
                        tracking: saveTracking.id
                    }
                });

            }
            return res.json({
                success: true,
                receipt: receipt,
                data: saveTracking,
                message: "Tracking added successfully"
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                error: e.message
            });
        }
    }
};

module.exports = trackingController;