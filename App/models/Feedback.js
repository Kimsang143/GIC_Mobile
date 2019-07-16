const mongoose = require('mongoose');
const validator = require('validator');

const feedbackSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: {
        type: String,
        validate: {
          validator: validator.isEmail,
          message: '{VALUE} is not a valid email',
          isAsync: false
        }
     },
    descrip: { type: String, required: true }
	},
    {
  	timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);
