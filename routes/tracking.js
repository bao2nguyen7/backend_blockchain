const express = require('express');
const tracking = require('../middlewares/tracking');
const trackingController = require('../controllers/trackingController');
const trackingRouter = express.Router();


trackingRouter.post("/tracking/add-tracking/:id", tracking, trackingController.addTracking)
<<<<<<< HEAD
trackingRouter.post("/tracking/get-tracking", tracking, trackingController.getTracking)
=======
trackingRouter.get("/tracking/get-tracking", tracking, trackingController.getTracking)
>>>>>>> a3577e8e4ebfc5a1048907604478957131c92532


module.exports = trackingRouter;