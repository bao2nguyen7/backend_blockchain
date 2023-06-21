const express = require('express');
const productRouter = express.Router();
const product = require('../middlewares/product');
const productController = require('../controllers/productController');

//Add-product
productRouter.post("/product/add-product", product, productController.addProduct);
//getAll product
productRouter.get("/product/get-product", product,productController.getAllProduct);
//getAn product
productRouter.get("/product/get-product/:id", product, productController.getProduct);
//update product
productRouter.put("/product/update-product/:id", product, productController.updateProduct);
  // Delete the product
productRouter.delete("/product/delete-product/:id", product, productController.deleteProduct);


module.exports = productRouter;
