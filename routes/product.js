const express = require('express');
const productRouter = express.Router();
const products = require('../middlewares/product');
const Product = require('../models/product');
//Add-product
productRouter.post("/product/add-product", products, async (req, res) => {
    try {
        const {name, address, images, description, time} = req.body;
        let product = new Product({
            name,
            address,
            time,
            image,
            description,
        })
        product = await products.save();
        res.json(product);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
})
module.exports = productRouter;
