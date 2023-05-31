const Product = require('../models/product');
const User = require('../models/user');
const {
    createProduct,
    getListProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    deliveryProduct
} = require('../scripts/Tracking')

const productController = {
    //addProduct
    addProduct: async (req, res) => {
        try {
            const {
                name,
                time,
                images,
                address,
                description,
                url
            } = req.body;
            let newProduct = new Product({
                name,
                time,
                images,
                address,
                description,
                url: "",
                userId: req.user
            });
            const saveProduct = await newProduct.save();
            console.log("product id: ", saveProduct.id);
            console.log("user id: ", saveProduct.userId);


            if (req.user) {
                const user = User.findById(req.user);
                await user.updateOne({
                    $push: {
                        products: saveProduct.id
                    }
                });
            }

            const receipt = await createProduct(saveProduct.id, saveProduct.userId, saveProduct.name, saveProduct.address);
            console.log("recript", receipt);
            let result = await Product.findOneAndUpdate({
                _id: saveProduct.id
            }, {
                url: receipt
            }, {
                new: true
            });
            console.log("URL: ", result.url);
            return res.json({
                success: true,
                receipt: receipt,
                data: result,
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
    //getAnProduct
    getAnProduct: async (req, res) => {
        try {
            const products = await Product.findById(req.params.id);
            const product = await getProduct(req.params.id);
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
            const products = await Product.findById(req.params.id);
            await products.updateOne({
                $set: req.body
            });

            const product = await updateProduct(req.params.id);
            console.log(product)

            if (req.user) {
                const user = User.findById(req.user);
                await user.updateOne({
                    $set: {
                        products: products
                    }
                });
            }
            res.status(200).json({
                success: true,
                data: products,
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
            await User.updateMany({
                products: req.params.id
            }, {
                $pull: {
                    products: req.params.id
                }
            });
            let product = await Product.findByIdAndDelete(req.params.id);
            const p = await deleteProduct(req.params.id);
            console.log(p)
            
            res.status(200).json({
                data: product,
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