const express = require('express');
const list = require('../middlewares/list');
const listRouter = express.Router();
const List = require('../models/list');
const Product = require('../models/product');

listRouter.post("/list/add-tracking/:id", list, async (req, res) => {
    try {
        const {name, time, images, address, description} = req.body;
        let newTracking = new List({
            name,
            time,
            images,
            address,
            description,
            productId:req.params.id,
            userId: req.user
        });
        const saveTracking = await newTracking.save();

        if(req.params.id){
            const product =Product.findById(req.params.id);
            await product.updateOne({$push:{tracking: saveTracking}});
        }
        return res.json({success:true, data: saveTracking, message: "Tracking added successfully"});
    } catch (e) {
        res.status(500).json({success:false,error: e.message});
    }
})



module.exports = listRouter;