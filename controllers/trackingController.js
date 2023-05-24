const Tracking = require('../models/tracking');
const Product = require('../models/product');
const User = require('../models/user');
const {
    addTracking,
    getTracking
} = require('../scripts/Tracking')


const trackingController = {
    // addTracking
    addTracking: async (req, res) => {
        try {
            const {
                name,
                time,
                images,
                address,
                description
            } = req.body;
            const pid = req.params.id;

            let newTracking = new Tracking({
                name,
                time,
                images,
                address,
                description,
                userId: req.user
            });
            const saveTracking = await newTracking.save();
            const product = Product.findById(req.params.id);
            console.log("product id:", pid)
            await product.updateOne({
                $push: {
                    tracking: saveTracking
                }
            });

            let receipt = await addTracking(pid, saveTracking.userId, saveTracking.id, name, address, time);
            console.log(receipt);

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
            const {
                uid
            } = req.body;

            const tracking = await Tracking.find();
            const track = await getTracking(uid);

            res.status(200).json({
                success: true,
                data: tracking,
                dataBC: track
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: e.message
            });
        }
    }
};

module.exports = trackingController;