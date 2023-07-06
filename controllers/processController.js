const Process = require('../models/process');
const stageProcessDB = require('../models/stageProcess');
const stagePlantSeedsDB = require('../models/stagePlantSeeds');
const stagePlantCareDB = require('../models/stagePlantCare');
const stageBloomDB = require('../models/stageBloom');
const stageCoverDB = require('../models/stageCover');
const stageHarvestDB = require('../models/stageHarvest');
const stageSellDB = require('../models/stageSell');

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
          water: stagePlantCareWater,
          fertilizer: stagePlantCareFertilizer
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
          quantity: stageHarvestQuantity
        },
        stageSell: {
          name: stageSellName,
          description: stageSellDescription,
          purchasingUnit: stageSellPurchasingUnit
        }
      } = req.body;
      const userId = req.user;

      let stageProcessSAVE = new stageProcessDB({
        name: stageProcessName,
        description: stageProcessDescription,
        images: stageProcessImages,
        timeCreate: stageProcessTime
      })

      let stagePlantSeedsSAVE = new stagePlantSeedsDB({
        name: stagePlantSeedsName,
        description: stagePlantSeedsDescription
      })

      let stagePlantCareSAVE = new stagePlantCareDB({
        name: stagePlantCareName,
        description: stagePlantCareDescription,
        water: stagePlantCareWater,
        fertilizer: stagePlantCareFertilizer
      })
      let stageBloomSAVE = new stageBloomDB({
        name: stageBloomName,
        description: stageBloomDescription
      })

      let stageCoverSAVE = new stageCoverDB({
        name: stageCoverName,
        description: stageCoverDescription
      })
      let stageHarvestSAVE = new stageHarvestDB({
        name: stageHarvestName,
        description: stageHarvestDescription,
        quantity: stageHarvestQuantity
      })
      let stageSellSAVE = new stageSellDB({
        name: stageSellName,
        description: stageSellDescription,
        purchasingUnit: stageSellPurchasingUnit
      })


      const saveStageProcess = await stageProcessSAVE.save();
      const saveStagePlantSeeds = await stagePlantSeedsSAVE.save();
      const saveStagePlantCare = await stagePlantCareSAVE.save();
      const saveStageBloom = await stageBloomSAVE.save();
      const saveStageCover = await stageCoverSAVE.save();
      const saveStageHarvest = await stageHarvestSAVE.save();
      const saveStageSell = await stageSellSAVE.save();

      // console.log(saveStagePlantSeeds);

      let process = new Process({
        userId,
        stageProcess: saveStageProcess.id,
        stagePlantSeeds: saveStagePlantSeeds.id,
        stagePlantCare: saveStagePlantCare.id,
        stageBloom: saveStageBloom.id,
        stageCover: saveStageCover.id,
        stageHarvest: saveStageHarvest.id,
        stageSell: saveStageSell.id
      })

      process = await process.save();
      // console.log(process);

      res.json(process);
    } catch (e) {
      res.status(500).json({
        error: e.message
      });
    }
  },

  // get All Processes
  getAllProcess: async (req, res) => {
    try {
      const Processes = await Process.find({});
      let newProcesses = []
      await Promise.all(
        Processes.map(async (item) => {
          const itemProcesses = await Process.findOne({
            _id: item.id
          });
          const stageProcess = await stageProcessDB.findOne({
            _id: itemProcesses.stageProcess._id
          })

          const stagePlantSeeds = await stagePlantSeedsDB.findOne({
            _id: itemProcesses.stagePlantSeeds._id
          })
          const stagePlantCare = await stagePlantCareDB.findOne({
            _id: itemProcesses.stagePlantCare._id
          })
          const stageBloom = await stageBloomDB.findOne({
            _id: itemProcesses.stageBloom._id
          })
          const stageCover = await stageCoverDB.findOne({
            _id: itemProcesses.stageCover._id
          })
          const stageHarvest = await stageHarvestDB.findOne({
            _id: itemProcesses.stageHarvest._id
          })
          const stageSell = await stageSellDB.findOne({
            _id: itemProcesses.stageSell._id
          })

          const dataProcess = {
            _id: itemProcesses._id,
            userId: itemProcesses.userId,
            stageProcess: stageProcess,
            stagePlantSeeds: stagePlantSeeds,
            stagePlantCare: stagePlantCare,
            stageBloom: stageBloom,
            stageCover: stageCover,
            stageHarvest: stageHarvest,
            stageSell: stageSell
          }

          newProcesses.push(dataProcess);
        })
      );
      res.json({
        sucess: true,
        data: newProcesses
      });
    } catch (e) {
      res.status(500).json({
        error: e.message
      });
    }
  },

  // get a Process
  getProcess: async (req, res) => {
    try {
      const Processes = await Process.findOne({
        _id: req.params.id
      });
      const stageProcess = await stageProcessDB.findOne({
        _id: Processes.stageProcess._id
      })
      const stagePlantSeeds = await stagePlantSeedsDB.findOne({
        _id: Processes.stagePlantSeeds._id
      })
      const stagePlantCare = await stagePlantCareDB.findOne({
        _id: Processes.stagePlantCare._id
      })
      const stageBloom = await stageBloomDB.findOne({
        _id: Processes.stageBloom._id
      })
      const stageCover = await stageCoverDB.findOne({
        _id: Processes.stageCover._id
      })
      const stageHarvest = await stageHarvestDB.findOne({
        _id: Processes.stageHarvest._id
      })
      const stageSell = await stageSellDB.findOne({
        _id: Processes.stageSell._id
      })

      const dataProcess = {
        userId: Processes.userId,
        stageProcess: stageProcess,
        stagePlantSeeds: stagePlantSeeds,
        stagePlantCare: stagePlantCare,
        stageBloom: stageBloom,
        stageCover: stageCover,
        stageHarvest: stageHarvest,
        stageSell: stageSell
      }
      res.json({
        sucess: true,
        data: dataProcess
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
          water: stagePlantCareWater,
          fertilizer: stagePlantCareFertilizer
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
          quantity: stageHarvestQuantity
        },
        stageSell: {
          name: stageSellName,
          description: stageSellDescription,
          purchasingUnit: stageSellPurchasingUnit
        }
      } = req.body;

      let Processes = await Process.findOne({
        _id: req.params.id
      })
      
      const stageProcessUpdate = await stageProcessDB.updateOne({
        _id: Processes.stageProcess._id
      }, {
        $set: {
          name: stageProcessName,
          description: stageProcessDescription,
          images: stageProcessImages,
          timeCreate: stageProcessTime
        }
      })
      const stagePlantSeedsUpdate = await stagePlantSeedsDB.updateOne({
        _id: Processes.stagePlantSeeds._id
      }, {
        $set: {
          name: stagePlantSeedsName,
          description: stagePlantSeedsDescription
        }
      })
      const stagePlantCareUpdate = await stagePlantCareDB.updateOne({
        _id: Processes.stagePlantCare._id
      }, {
        $set: {
          name: stagePlantCareName,
          description: stagePlantCareDescription,
          water: stagePlantCareWater,
          fertilizer: stagePlantCareFertilizer
        }
      })
      const stageBloomUpdate = await stageBloomDB.updateOne({
        _id: Processes.stageBloom._id
      }, {
        $set: {
          name: stageBloomName,
          description: stageBloomDescription
        }
      })
      const stageCoverUpdate = await stageCoverDB.updateOne({
        _id: Processes.stageCover._id
      }, {
        $set: {
          name: stageCoverName,
          description: stageCoverDescription
        }
      })
      const stageHarvestUpdate = await stageHarvestDB.updateOne({
        _id: Processes.stageHarvest._id
      }, {
        $set: {
          name: stageHarvestName,
          description: stageHarvestDescription,
          quantity: stageHarvestQuantity
        }
      })
      const stageSellUpdate = await stageSellDB.updateOne({
        _id: Processes.stageSell._id
      }, {
        $set: {
          name: stageSellName,
          description: stageSellDescription,
          purchasingUnit: stageSellPurchasingUnit
        }
      })

      const view = await stageProcessDB.findOne({
        _id: Processes.stageProcess._id
      })

      console.log(view);

      const updateProcess = {
        stageProcessUpdate,
        stagePlantSeedsUpdate,
        stagePlantCareUpdate,
        stageBloomUpdate,
        stageCoverUpdate,
        stageHarvestUpdate,
        stageSellUpdate
      }

      Processes = await Process.updateOne({
        _id: req.params.id
      }, updateProcess)

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