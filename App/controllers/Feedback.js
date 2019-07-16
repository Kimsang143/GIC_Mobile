const mongoose = require("mongoose");
const Feedback = require("../models/Feedback");

exports.Feedback_get_all = (req, res, next) => {
  Feedback.find()
    .select()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        feedbacks: docs
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

exports.Feedback_create_one = (req, res, next) => {
  const feedback = new Feedback({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    descrip: req.body.descrip
  });
  feedback
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created Feedback successfully",
        createdFeedback: {
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
