const mongoose = require('mongoose');

const newSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    image: { type: String, required: true },
    content : { type: String, required: true },
    description: { type: String },
    shared_url: { type: String },
    release_date : { type: String, required: true },
	},
    {
  	timestamps: true
});

module.exports = mongoose.model('New', newSchema);
