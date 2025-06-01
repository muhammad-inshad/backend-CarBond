const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image:{
   type:String
  },
  email: {
    type: String,
    required: true,
    unique: true, // avoid duplicate registrations
    lowercase: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // optional: enforce stronger password
  },
}, {
  timestamps: true, // adds createdAt and updatedAt fields
});

module.exports = mongoose.model('User', userSchema);
