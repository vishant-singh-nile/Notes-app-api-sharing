const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  Taskname: String,
  date: String,
  time: String,
  repeat: Boolean
});

const titleSchema = new mongoose.Schema({
  title: String,
  tasks: [taskSchema]
});

module.exports = mongoose.model('Title', titleSchema);
