const express = require("express");
const router = express.Router();
// const multer = require('multer');
const FeedbackController = require('../controllers/Feedback');

// const cloudinary = require("cloudinary");
// const cloudinaryStorage = require("multer-storage-cloudinary");

// cloudinary.config({
//     cloud_name: 'love4kh',
//     api_key: '332223379812156',
//     api_secret: 'jZkFI1ojsA5QC33of3OnbmMOP20'
// });
//
// const storage = cloudinaryStorage({
//     cloudinary: cloudinary,
//     folder: "ios-events",
//     allowedFormats: ["jpg", "png", "mp3","audio"],
//     transformation: [{ width: 332, height: 499, crop: 'limit' }]
// });
//
// const upload = multer({ storage: storage });

router.get("/", FeedbackController.Feedback_get_all);

router.post("/", FeedbackController.Feedback_create_one);

module.exports = router;
