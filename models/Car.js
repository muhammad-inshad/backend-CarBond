const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  year: Number,
  image: String,
  make: Number,
  owner: Number,
});


module.exports = mongoose.model('Car', carSchema);
