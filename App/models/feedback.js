const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true },
    descrip: { type: String, required: true }
	},
    {
  	timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);
