const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const mongoose = require("mongoose");

const faqRoutes = require('./App/routes/faq');
const bannerRoutes = require('./App/routes/banner');
const eventRoutes = require('./App/routes/event');
const newRoutes = require('./App/routes/new');
const feedbacksRoutes = require('./App/routes/feedback');

mongoose.connect(
  "mongodb://lovesong:" +
    "Cocoopark" +
    "@cluster0-shard-00-00-dp6l4.mongodb.net:27017,cluster0-shard-00-01-dp6l4.mongodb.net:27017,cluster0-shard-00-02-dp6l4.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    useMongoClient: true
  }
);
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/faqs", faqRoutes);
app.use("/banners", bannerRoutes);
app.use("/events", eventRoutes);
app.use("/news", newRoutes);
app.use("/feedbacks", feedbacksRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
