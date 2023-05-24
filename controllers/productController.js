const Product = require('../models/product');
const User = require('../models/user');
const {
    createProduct,
    getAllListProducts,
    getOneProduct
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
                url:"",
                userId: req.user
            });
            const saveProduct = await newProduct.save();
            console.log("product id: ", saveProduct.id);
            console.log("user id: ", saveProduct.userId);


            if (req.user) {
                const user = User.findById(req.user);
                await user.updateOne({$push:{products: saveProduct.id}});
            }

            const receipt = await createProduct(saveProduct.id, saveProduct.userId);
            console.log("recript", receipt);
            let result = await Product.findOneAndUpdate({_id:saveProduct.id},{url: receipt},{new:true});
            console.log("URL: ", result.url);
            return res.json({
                success: true,
                url: receipt,
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

            const productBC = await getAllListProducts();

            res.json({
                success: true,
                // data: products,
                dataBC: productBC,
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
            // const product = getOneProduct(products.id, products.userId);
            res.json({
                success: true,
                data: products
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
            await products.updateOne({$set: req.body});
            if(req.user){
                const user = User.findById(req.user);
                await user.updateOne({$set:{products: products}});
            }
            res.status(200).json({success:true,data:products,message:"Updated successfully"});
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
            res.status(200).json({
                data: product,
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