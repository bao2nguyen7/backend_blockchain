const Tracking = require('../models/tracking');
const Product = require('../models/product');
const User = require('../models/user');
const {
    addTracking,
    getTracking,
    deliveryProduct
} = require('../scripts/Tracking')


const trackingController = {
    // addTracking
    addTracking: async (req, res) => {
        try {
            const {
                name,
                images,
                description,
                time,
                // notes
            } = req.body;
            const pid = req.params.id;

            let newTracking = new Tracking({
                productId:pid,
                name,
                images,
                description,
                time,
                // notes,
                url:""
            });
            const saveTracking = await newTracking.save();
            if(pid){
                const product = Product.findById(pid);
                await product.updateOne({
                    $push: {
                        tracking: saveTracking.id
                    }
                });
            }
            // console.log(pid,  saveTracking.id, name, images, description, time);

            const receipt = await addTracking(pid,  saveTracking.id, name, images, description, time);
            console.log(receipt);

            let result = await Tracking.findOneAndUpdate({_id:saveTracking.id},{url: receipt},{new:true});
            console.log("URL: ", result.url);
            return res.json({
                success: true,
                receipt: receipt,
                data: result,
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
            const track = await getTracking(req.params.id);
            
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
    deleteTracking: async(req,res)=>{
        try {
            await Product.updateMany(
                {tracking: req.params.id},
                {$pull:{tracking: req.params.id}}
            );
            let tracking = await Tracking.findByIdAndDelete(req.params.id);
            res.status(200).json({data:tracking,message:"Delete Successfully"});
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },
    
    deliveried: async(req, res) => {
        try {
            const {
                name,
                images,
                description,
                time
            } = req.body;
            const pid = req.params.id;

            let newTracking = new Tracking({
                productId:pid,
                name,
                images,
                description,
                time,
                url:"",
            });
            const saveTracking = await newTracking.save();
            if(pid){
                const product = Product.findById(pid);
                // console.log("product id:", pid)
                await product.updateOne({
                    $push: {
                        tracking: saveTracking.id
                    }
                });
            }

            const receipt = await deliveryProduct(pid, saveTracking.id, name, images, description ,time);
            console.log(receipt);
            let result = await Tracking.findOneAndUpdate({_id:saveTracking.id},{url: receipt},{new:true});
            console.log("URL: ", result.url);
            return res.json({
                success: true,
                receipt: receipt,
                data: result,
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