const Process = require('../models/process');


const processController = {
  //Add-process
  addProcess : async (req, res) => {
    try {
        const {userId, images, name, description, time} = req.body;
        let process = new Process({
            userId, 
            name,
            images,
            time,
            description,
        })
        process = await process.save();
        res.json(process);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
  },

  // get All Processes
  getProcess : async (req, res) => {
    try {
        const Processes = await Process.find({});
        res.json({sucess: true, data:Processes});
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
  },

  // get A Process
  getAProcess : async (req, res) => {
    try {
        const Processes = await Process.findOne({_id: req.params.id});
        res.json({sucess: true, data:Processes});

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
  },

  // update A Process
  updateProcess : async (req, res) => {
    try {
        // let Processes = await Process.findOne({_id: req.params.id});
        let Processes = await Process.updateOne(
            { _id: req.params.id },
            { $set: req.body }
          )
        res.json({sucess: true, data:Processes});

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
  },

  deleteProcess : async (req, res) => {
    try {
        await Process.updateMany(
            {Processes: req.params.id},
            {$pull:{Processes: req.params.id}}
        );
        let Processes = await Process.findByIdAndDelete(req.params.id);
        res.status(200).json({data:Processes, message:"Delete Successfully"});
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
  }
}


module.exports = processController;