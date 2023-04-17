const express = require('express');
const bcrypt = require("bcryptjs");
const user = require("../models/user");
const authenRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require('../middlewares/auth');

//SignIn routes
authenRouter.post("/signup", async(req, res) => {
    
    try {
        const {name,email,password,userType} = req.body;
        const oldUser = await user.findOne({email});
        if(oldUser){
            return res.status(400).json({ msg: "User with same email already exists"})
        }
        const encryptedPassword = await bcrypt.hash(password, 8);
        let User = new user({
            name,
            email,
            password:encryptedPassword,
            userType
        });
        User = await User.save();
        res.json(User);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
//SignOut routes
authenRouter.post("/signin", async(req, res) => {
    try {
        const {email,password} = req.body;
        const userLogin = await user.findOne({email});
        if(!userLogin){
            return res.status(400).json({msg: "User with same email already exists"});
        }
        const isMatch = await bcrypt.compare(password,userLogin.password);
        if(!isMatch){
            return res.status(400).json({msg: "Incorrect password"});
        }
        const token = jwt.sign({id:userLogin._id},"passwordKey");
        res.json({token, ...userLogin._doc})
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

//TokenIsValid
authenRouter.post("/tokenIsValid", async(req, res) => {
    try {
        const token = req.header('x-auth-token');
        if(!token) return res.json(false);
        const verified = jwt.verify(token,'passwordKey');
        if(!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if(!user) return res.json(false);
        res.json(true);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

//getUserData
authenRouter.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({ ...user._doc, token: req.token });
});

module.exports = authenRouter;