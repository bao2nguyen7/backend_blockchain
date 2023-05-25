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
                description,
                url
            } = req.body;
            const pid = req.params.id;

            let newTracking = new Tracking({
                name,
                time,
                images,
                address,
                description,
                productID:pid,
                url:"",
                userId: req.user
            });
            const saveTracking = await newTracking.save();
            if(pid){
                const product = Product.findById(pid);
                console.log("product id:", pid)
                await product.updateOne({
                    $push: {
                        tracking: saveTracking.id
                    }
                });
            }

            const receipt = await addTracking(pid, saveTracking.userId, saveTracking.id, name, address, time);
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
    }
};

module.exports = trackingController;