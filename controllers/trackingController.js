const Tracking = require('../models/tracking');
const Product = require('../models/product');
const User = require('../models/user');

const trackingController = {
    // addTracking
    addTracking : async (req, res) => {
        try {
            const {name, time, images, address, description} = req.body;
            let newTracking = new Tracking({
                name,
                time,
                images,
                address,
                description,
                userId: req.user
            });
            const saveTracking = await newTracking.save();
            // if(req.params.id){
            //     const product =Product.findById(req.params.id);
            //     await product.updateOne({$push:{tracking: saveTracking}});
            //     const user = await User.findById(req.user);
            //     const productArrayUser = user.products
            //     for (const productE of productArrayUser){
            //         if(productE._id === product.id){
            //             productE.updateOne({$push:{tracking: saveTracking}});
            //             break;
            //         }
            //     }
    
            // }
            return res.json({success:true, data: saveTracking, message: "Tracking added successfully"});
        } catch (e) {
            res.status(500).json({success:false,error: e.message});
        }
    },
    //getTracking
    getTracking: async (req,res)=>{
        try {
            const {productID} = req.body;
            const product = await Product.findById(productID);
            res.status(200).json({success:true,data:product.tracking});
        } catch (error) {
            res.status(500).json({success:false,error: e.message});
        }
    }
};

module.exports = trackingController;