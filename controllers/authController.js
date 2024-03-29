const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authController = {
    //SignUp
    signUpAuth: async (req, res) => {

        try {
            const {
                name,
                email,
                password,
                userType
            } = req.body;
            const oldUser = await user.findOne({
                email
            });
            if (oldUser) {
                return res.status(400).json({
                    msg: "User with same email already exists"
                })
            }
            const encryptedPassword = await bcrypt.hash(password, 8);
            let User = new user({
                name,
                email,
                password: encryptedPassword,
                userType
            });
            User = await User.save();
            res.json({
                success: true,
                data: User,
                message: "Added successfully"
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },
    //SignIN
    signInAuth: async (req, res) => {
        try {
            const {
                email,
                password
            } = req.body;
            const userLogin = await user.findOne({
                email
            });
            if (!userLogin) {
                return res.status(400).json({
                    msg: "User with same email already exists"
                });
            }
            const isMatch = await bcrypt.compare(password, userLogin.password);
            if (!isMatch) {
                return res.status(400).json({
                    msg: "Incorrect password"
                });
            }
            const token = jwt.sign({
                id: userLogin._id
            }, "passwordKey");
            res.json({
                token,
                ...userLogin._doc
            })
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },
    //tokenIsValid
    tokenIsValid: async (req, res) => {
        try {
            const token = req.header['x-auth-token'];
            if (!token) return res.json(false);
            const verified = jwt.verify(token, 'passwordKey');
            if (!verified) return res.json(false);
            const User = await user.findById(verified.id);
            if (!User) return res.json(false);
            res.json({
                msg: "Successfully verified"
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },
    //GetAllAuth
    getAllAuth: async (req, res) => {
        const User = await user.find();
        res.json({
            data: User,
            ...User._doc,
            token: req.token
        });
    },
    //GetAnAuth
    getAnAuth: async (req, res) => {
        const User = await user.findById(req.user);
        res.json({
            data: User,
            token: req.token
        });
    },
    //GetEachUserInAdmin
    getUserFromAdmin: async (req, res) => {
        const User = await user.findById(req.params.id);
        res.json({
            data: User,
            token: req.token
        });
    },
    //UpdateProfile
    updateProfile: async (req, res) => {
        let User = await user.findById(req.user);
        const {
            email,
            name
        } = req.body;

        await User.updateOne({
            $set: {
                email: email,
                name: name
            }
        });
        res.json({
            message: "successful",
        });
    }
};

module.exports = authController;