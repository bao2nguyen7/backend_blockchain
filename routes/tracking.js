const express = require('express');
const tracking = require('../middlewares/tracking');
const trackingController = require('../controllers/trackingController');
const trackingRouter = express.Router();


trackingRouter.post("/tracking/add-tracking/:id", tracking, trackingController.addTracking)

trackingRouter.post("/tracking/get-tracking", tracking, trackingController.getTracking)


module.exports = trackingRouter;