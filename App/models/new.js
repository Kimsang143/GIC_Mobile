const mongoose = require('mongoose');

const newSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    newImage: { type: String, required: true },
    descrip: { type: String, required: true }
	},
    {
  	timestamps: true
});

module.exports = mongoose.model('New', newSchema);