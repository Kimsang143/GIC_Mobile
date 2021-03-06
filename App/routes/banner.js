const express = require("express");
const router = express.Router();
const multer = require('multer');
const bannersController = require('../controllers/banner');

const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: 'love4kh',
    api_key: '332223379812156',
    api_secret: 'jZkFI1ojsA5QC33of3OnbmMOP20'
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "music",
    allowedFormats: ["jpg", "png", "mp3","audio"],
    transformation: [{ width: 332, height: 499, crop: 'limit' }]
});

const upload = multer({ storage: storage });

router.get("/", bannersController.banners_get_all);

router.post("/", upload.single('bannerImage'), bannersController.banners_create_banner);

router.get("/:bannerId", bannersController.banners_get_banner);

router.patch("/:bannerId", bannersController.banners_update_banner);

router.delete("/:bannerId", bannersController.banners_delete);

module.exports = router;
