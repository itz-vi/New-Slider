const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/slider");

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  username: String,
})

module.exports = mongoose.model('user', userSchema)