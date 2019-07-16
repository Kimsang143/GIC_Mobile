const mongoose = require('mongoose');
const validator = require('validator');

const feedbackSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      validate: {
        validator: !validator.isEmpty,
        message: 'Please fill a valid name',
        isAsync: false
      }
    },
    email: {
        type: String,
        validate: {
          validator: validator.isEmail,
          message: '{VALUE} is not a valid email',
          isAsync: false
        }
     },
    descrip: {
      type: String,
      validate: {
        validator: !validator.isEmpty,
        message: 'Please fill a valid description',
        isAsync: false
      }
    }
	},
    {
  	timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);
