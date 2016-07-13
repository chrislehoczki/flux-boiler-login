const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({


  title: String,
  complete: Boolean



});

module.exports = mongoose.model('Todo', todoSchema);