const mongoose = require("mongoose");
const New = require("../models/new");

exports.News_get_all = (req, res, next) => {
  New.find()
    .select()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        News: docs
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

exports.News_create_New = (req, res, next) => {
  const news = new New({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    newImage: req.file.url,
    descrip: req.body.descrip
  });
  news
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created New successfully",
        createdNew: {
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

exports.News_get_New = (req, res, next) => {
  const id = req.params.NewId;
  New.findById(id)
    .select()
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          New: doc,
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

exports.News_update_New = (req, res, next) => {
  const id = req.params.NewId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  New.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "New updated",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.News_delete = (req, res, next) => {
  const id = req.params.NewId;
  New.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "New deleted",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
