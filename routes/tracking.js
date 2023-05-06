const express = require('express');
const tracking = require('../middlewares/tracking');
const trackingController = require('../controllers/trackingController');
const trackingRouter = express.Router();


trackingRouter.post("/tracking/add-tracking", tracking, trackingController.addTracking)
trackingRouter.get("/tracking/get-tracking", tracking, trackingController.getTracking)


module.exports = trackingRouter;