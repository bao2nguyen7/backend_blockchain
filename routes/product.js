const express = require('express');
const productRouter = express.Router();
const products = require('../middlewares/product');
const {Product} = require('../models/product');
//Add-product
productRouter.post("/product/add-product", products, async (req, res) => {
    try {
        const {name, address, images, description, time} = req.body;
        let product = new Product({
            name,
            address,
            time,
            images,
            description,
        })
        product = await product.save();
        res.json(product);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
})
productRouter.get("/product/get-products", products, async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

  // Delete the product
productRouter.post("/product/delete-product", products, async (req, res) => {
    try {
        const { id } = req.body;
        let product = await Product.findByIdAndDelete(id);
        res.json(product);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
  });
module.exports = productRouter;
