const Process = require('../models/process');


const processController = {
  //Add-process
  addProcess: async (req, res) => {
    try {
      const {
        stageProcess: {
          name: stageProcessName,
          description: stageProcessDescription,
          images: stageProcessImages,
          timeCreate: stageProcessTime
        },
        stagePlantSeeds: {
          name: stagePlantSeedsName,
          description: stagePlantSeedsDescription
        },
        stagePlantCare: {
          name: stagePlantCareName,
          description: stagePlantCareDescription,
          labelWater: stagePlantCareLabelWater,
          descriptionWater: stagePlantCareDescriptionWater,
          labelFertilizer: stagePlantCareLabelFertilizer,
          descriptionFertilizer: stagePlantCareDescriptionFertilizer,
        },
        stageBloom: {
          name: stageBloomName,
          description: stageBloomDescription
        },
        stageCover: {
          name: stageCoverName,
          description: stageCoverDescription
        },
        stageHarvest: {
          name: stageHarvestName,
          description: stageHarvestDescription,
          labelQuantity: stagePlantCareLabelQuantity,
          descriptionQuantity: stagePlantCareDescriptionQuantity,
        },
        stageSell: {
          name: stageSellName,
          description: stageSellDescription,
          labelPurchasingUnit: stagePlantCareLabelPurchasing,
          descriptionPurchasingUnit: stagePlantCareDescriptionPurchasing,
        }
      } = req.body;
      const userId = req.user;

      let process = new Process({
        userId,
        stageProcess: {
          name: stageProcessName,
          description: stageProcessDescription,
          images: stageProcessImages,
          timeCreate: stageProcessTime
        },
        stagePlantSeeds: {
          name: stagePlantSeedsName,
          description: stagePlantSeedsDescription
        },
        stagePlantCare: {
          name: stagePlantCareName,
          description: stagePlantCareDescription,
          labelWater: stagePlantCareLabelWater,
          descriptionWater: stagePlantCareDescriptionWater,
          labelFertilizer: stagePlantCareLabelFertilizer,
          descriptionFertilizer: stagePlantCareDescriptionFertilizer,
        },
        stageBloom: {
          name: stageBloomName,
          description: stageBloomDescription
        },
        stageCover: {
          name: stageCoverName,
          description: stageCoverDescription
        },
        stageHarvest: {
          name: stageHarvestName,
          description: stageHarvestDescription,
          labelQuantity: stagePlantCareLabelQuantity,
          descriptionQuantity: stagePlantCareDescriptionQuantity,
        },
        stageSell: {
          name: stageSellName,
          description: stageSellDescription,
          labelPurchasingUnit: stagePlantCareLabelPurchasing,
          descriptionPurchasingUnit: stagePlantCareDescriptionPurchasing,
        }
      })
      process = await process.save();
      res.json(process);
    } catch (e) {
      res.status(500).json({
        error: e.message
      });
    }
  },

  // get All Processes
  getProcess: async (req, res) => {
    try {
      const Processes = await Process.find({});
      res.json({
        sucess: true,
        data: Processes
      });
    } catch (e) {
      res.status(500).json({
        error: e.message
      });
    }
  },

  // get A Process
  getAProcess: async (req, res) => {
    try {
      const Processes = await Process.findOne({
        _id: req.params.id
      });
      res.json({
        sucess: true,
        data: Processes
      });

    } catch (e) {
      res.status(500).json({
        error: e.message
      });
    }
  },

  // update A Process
  updateProcess: async (req, res) => {
    try {
      // let Processes = await Process.findOne({_id: req.params.id});
      let Processes = await Process.updateOne({
        _id: req.params.id
      }, {
        $set: req.body
      })
      res.json({
        sucess: true,
        data: Processes
      });

    } catch (e) {
      res.status(500).json({
        error: e.message
      });
    }
  },

  deleteProcess: async (req, res) => {
    try {
      await Process.updateMany({
        Processes: req.params.id
      }, {
        $pull: {
          Processes: req.params.id
        }
      });
      let Processes = await Process.findByIdAndDelete(req.params.id);
      res.status(200).json({
        data: Processes,
        message: "Delete Successfully"
      });
    } catch (e) {
      res.status(500).json({
        error: e.message
      });
    }
  }
}


module.exports = processController;