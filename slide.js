const mongoose = require("mongoose");

const slideSchema = mongoose.Schema({
  title: String,
  description: String,
  image: String,

});

module.exports = mongoose.model('slide', slideSchema);
