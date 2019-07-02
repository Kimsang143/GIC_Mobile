const express = require("express");
const router = express.Router();
const multer = require('multer');
const NewsController = require('../controllers/new');

const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: 'love4kh',
    api_key: '332223379812156',
    api_secret: 'jZkFI1ojsA5QC33of3OnbmMOP20'
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "ios-news",
    allowedFormats: ["jpg", "png", "mp3","audio"],
    transformation: [{ width: 332, height: 499, crop: 'limit' }]
});

const upload = multer({ storage: storage });

router.get("/", NewsController.News_get_all);

router.post("/", upload.single('newImage'), NewsController.News_create_New);

router.get("/:NewId", NewsController.News_get_New);

router.patch("/:NewId", upload.single('newImage'),NewsController.News_update_New);

router.delete("/:NewId", NewsController.News_delete);

module.exports = router;
