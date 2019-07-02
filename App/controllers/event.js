const mongoose = require("mongoose");
const Event = require("../models/event");

exports.Events_get_all = (req, res, next) => {
  Event.find()
    .select()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        Events: docs
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.Events_create_Event = (req, res, next) => {
  const event = new Event({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    eventImage: req.file.url,
    descrip: req.body.descrip
  });
  event
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created Event successfully",
        createdEvent: {
          name: result.name,
          _id: result._id,
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.Events_get_Event = (req, res, next) => {
  const id = req.params.EventId;
  Event.findById(id)
    .select()
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          Event: doc,
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.Events_update_Event = (req, res, next) => {
  const id = req.params.EventId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Event.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Event updated",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.Events_delete = (req, res, next) => {
  const id = req.params.EventId;
  Event.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Event deleted",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
