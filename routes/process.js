const express = require('express');
const processRouter = express.Router();
const process = require('../middlewares/process');
const processController = require('../controllers/processController');

// Add process
processRouter.post("/process/add-process", process, processController.addProcess);

processRouter.get("/process/get-processes", processController.getAllProcess);

processRouter.get("/process/get-process/:id",  processController.getProcess);

processRouter.put("/process/update-process/:id", process, processController.updateProcess);

processRouter.delete("/process/delete-process/:id", process, processController.deleteProcess);

module.exports = processRouter;
