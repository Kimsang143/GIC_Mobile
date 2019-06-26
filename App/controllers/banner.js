const mongoose = require("mongoose");
const Banner = require("../models/banner");


exports.banners_get_all = (req, res, next) => {
  Banner.find()
    .select()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        banners: docs
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

exports.banners_create_banner = (req, res, next) => {
  const banner = new Banner({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    bannerImage: req.file.url
  });
  banner
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created banner successfully",
        createdbanner: {
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

exports.banners_get_banner = (req, res, next) => {
  const id = req.params.bannerId;
  Banner.findById(id)
    .select()
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          banner: doc,
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

exports.banners_update_banner = (req, res, next) => {
  const id = req.params.bannerId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Banner.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "banner updated",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.banners_delete = (req, res, next) => {
  const id = req.params.bannerId;
  Banner.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "banner deleted",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
