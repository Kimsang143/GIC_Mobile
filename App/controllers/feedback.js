const mongoose = require("mongoose");
const Feedback = require("../models/feedback");
const { body } = require('express-validator/check');
const { validationResult } = require('express-validator/check');

exports.validate = (method) => {
  switch (method) {
    case 'createFeedback': {
     return [
        body('name', 'Name is required').isLength({ min: 1 }),
        body('email', 'Invalid email').isEmail(),
        body('descrip', 'Description is required').isLength({ min: 1 })
       ]
    }
  }
}

exports.getAllFeedbacks = (req, res, next) => {
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

exports.createFeedback = async (req, res, next) => {

  try {
     const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

     if (!errors.isEmpty()) {
       res.status(422).json({ errors: errors.array() });
       return;
     }

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

  } catch(err) {
    return next(err)
  }

};
