const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    eventImage: { type: String, required: true },
    descrip: { type: String, required: true }
	},
    {
  	timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);