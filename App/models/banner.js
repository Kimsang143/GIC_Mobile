const mongoose = require('mongoose');

const bannerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    bannerImage: { type: String, required: true }
	},
    {
  	timestamps: true
});

module.exports = mongoose.model('Banner', bannerSchema);