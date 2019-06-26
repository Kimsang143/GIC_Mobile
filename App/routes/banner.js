const express = require("express");
const router = express.Router();
const multer = require('multer');
const bannersController = require('../controllers/banner');

const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: 'khmer-make',
    api_key: '745767955329641',
    api_secret: '9VJyZS9cexI-IMVVRcmoForgMP8'
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "gic_mobile",
    allowedFormats: ["jpg", "png"]
});

const upload = multer({ storage: storage });

router.get("/", bannersController.banners_get_all);

router.post("/", upload.single('bannerImage'), bannersController.banners_create_banner);

router.get("/:bannerId", bannersController.banners_get_banner);

router.patch("/:bannerId", bannersController.banners_update_banner);

router.delete("/:bannerId", bannersController.banners_delete);

module.exports = router;
