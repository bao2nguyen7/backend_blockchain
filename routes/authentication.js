const express = require('express');
const authenRouter = express.Router();
const auth = require('../middlewares/auth');
const authController = require('../controllers/authController');

//SignUp routes
authenRouter.post("/signup", authController.signUpAuth);
//SignIn routes
authenRouter.post("/signin", authController.signInAuth);
//TokenIsValid
authenRouter.post("/tokenIsValid", authController.tokenIsValid);
//getAllUserData
authenRouter.get("/", auth, authController.getAllAuth);
//getAnUserData
authenRouter.get("/getAnAuth", auth, authController.getAnAuth);
//GetEachUserInAdmin
authenRouter.get("/admin/:id", auth, authController.getUserFromAdmin);
//UpdateProfile
authenRouter.put("/updateProfile", auth, authController.updateProfile);

module.exports = authenRouter;