const Product = require('../models/product');
const User = require('../models/user');
const {
    createProduct,
    getListProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    verifyProduct
} = require('../scripts/Tracking')
const uniqid = require('uniqid');


const productController = {
    //addProduct
    addProduct: async (req, res) => {
        try {

            const id = uniqid();
            console.log("uniqid", id);
            const {
                name,
                time,
                images,
                certificates,
                address,
                description,
                processId
            } = req.body;
            // console.log("adding")
            const userId = req.user;
            // console.log("userId", userId);
            const verify = await verifyProduct(id, userId, name, address, time);
            console.log("Verify: ", verify);
            let receipt = "";
            let saveProduct;

            if (verify == true) {
                receipt = await createProduct(id, userId, name, address, time);
                if (receipt.status === "1") {
                    let newProduct = new Product({
                        productId: id,
                        name,
                        time,
                        images,
                        certificates,
                        address,
                        description,
                        url: receipt.receipt,
                        userId: req.user,
                        processId
                    });
                    saveProduct = await newProduct.save();

                    if (req.user) {
                        const user = User.findById(req.user);
                        await user.updateOne({
                            $push: {
                                products: saveProduct.id
                            }
                        });
                    }

                }
            }

            return res.json({
                success: true,
                receipt: receipt,
                data: saveProduct,
                message: "Product added successfully"
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                error: e.message
            });
        }
    },
    //getAllProduct 
    getAllProduct: async (req, res) => {
        try {
            const products = await Product.find();

            const productBC = await getListProducts();
            console.log(productBC)
            res.json({
                success: true,
                // data: products,
                dataSC: productBC,
                data: products
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                error: e.message
            });
        }
    },
    //getProduct
    getProduct: async (req, res) => {
        try {
            const products = await Product.findOne({
                productId: req.params.id
            });
            const product = await getProduct(req.params.id);
            // console.log("get product", product);
            res.json({
                success: true,
                data: products,
                dataBC: product
            });


        } catch (e) {
            res.status(500).json({
                success: false,
                error: e.message
            });
        }
    },
    //updateProduct
    updateProduct: async (req, res) => {
        try {
            const products = await Product.findOne({
                productId: req.params.id
            });
            await products.updateOne({
                $set: req.body
            });

            const product = await updateProduct(req.params.id);
            // console.log(product)

            if (req.user) {
                const user = User.findById(req.user);
                await user.updateOne({
                    $set: {
                        products: products.id
                    }
                });
            }
            let result = await Product.findOneAndUpdate({
                _id: products.id
            }, {
                url: product
            }, {
                new: true
            });
            console.log("URL: ", result.url);
            res.status(200).json({
                success: true,
                data: result,
                dataSC: product,
                message: "Updated successfully"
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                error: e.message
            });
        }
    },
    //deleteProduct
    deleteProduct: async (req, res) => {
        try {
            console.log(req.params.id);
            // await User.updateMany({
            //     products: req.params.id
            // }, {
            //     $pull: {
            //         products: req.params.id
            //     }
            // });
            // let product = await Product.findByIdAndDelete(req.params.id);
            const p = await deleteProduct(req.params.id);
            console.log(p)

            res.status(200).json({
                // data: product,
                dataSC: p,
                message: "Delete Successfully"
            });
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }
};

module.exports = productController;