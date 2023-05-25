const express = require('express');
const tracking = require('../middlewares/tracking');
const trackingController = require('../controllers/trackingController');
const trackingRouter = express.Router();


trackingRouter.post("/tracking/add-tracking/:id", tracking, trackingController.addTracking)
trackingRouter.get("/tracking/get-tracking/:id", tracking, trackingController.getTracking)
trackingRouter.delete("/tracking/delete-tracking/:id", tracking, trackingController.deleteTracking)


module.exports = trackingRouter;