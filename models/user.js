const mongoose = require('mongoose');

const userSchema = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
}));

module.exports = userSchema;
