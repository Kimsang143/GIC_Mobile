const express = require("express");
const router = express.Router();
const multer = require('multer');
const EventsController = require('../controllers/event');

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

router.get("/", EventsController.Events_get_all);

router.post("/", upload.single('eventImage'), EventsController.Events_create_Event);

router.get("/:EventId", EventsController.Events_get_Event);

router.patch("/:EventId", upload.single('eventImage'),EventsController.Events_update_Event);

router.delete("/:EventId", EventsController.Events_delete);

module.exports = router;
