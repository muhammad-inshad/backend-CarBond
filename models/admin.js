const mongoose = require('mongoose');

const AdminLogin=new mongoose.Schema({
    name:String,
    password:String
})

module.exports = mongoose.model('admin', AdminLogin);