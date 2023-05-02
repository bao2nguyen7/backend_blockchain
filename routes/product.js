const express = require('express');
const productRouter = express.Router();
const product = require('../middlewares/product');
const Product = require('../models/product');
const User = require('../models/user');
//Add-product
productRouter.post("/product/add-product", product, async (req, res) => {
    try {
        const {name, time, images, address, description} = req.body;
        let newProduct = new Product({
            name,
            time,
            images,
            address,
            description,
            userId: req.user
        });
        const saveProduct = await newProduct.save();

        if(req.user){
            const user = User.findById(req.user);
            await user.updateOne({$push:{products: saveProduct}});
        }
        return res.json({success:true, data: saveProduct, message: "Product added successfully"});
    } catch (e) {
        res.status(500).json({success:false,error: e.message});
    }
})
//getAll product
productRouter.get("/product/get-product", product, async (req, res) => {
    try {
        const products = await Product.find();
        res.json({success:true,data:products});
    } catch (e) {
        res.status(500).json({ success:false,error: e.message });
    }
});
//getAn product
productRouter.get("/product/get-product/:id", product, async (req, res) => {
    try {
        const products = await Product.findById(req.params.id);
        res.json({success:true,data:products});
    } catch (e) {
        res.status(500).json({ success:false,error: e.message });
    }
});
//update product
productRouter.put("/product/update-product/:id", product, async (req, res) => {
    try {
        const products = await Product.findById(req.params.id);
        await products.updateOne({$set: req.body});
        res.status(200).json({success:true,data:products,message:"Updated successfully"});
    } catch (e) {
        res.status(500).json({ success:false,error: e.message });
    }
});
  // Delete the product
productRouter.delete("/product/delete-product/:id", product, async (req, res) => {
    try {
        await User.updateMany(
            {products: req.params.id},
            {$pull:{products: req.params.id}}
        );
        let product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({data:product,message:"Delete Successfully"});
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
module.exports = productRouter;
