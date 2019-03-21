const mongoose = require('mongoose');

// Define schema for thread
const threadSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, require: true},
  description: { type: String, require: true},
  tags: { type: Array, require: true },
  userName: { type: String, require: true },
  date: { type: Date, rquired: false, default: Date.now }
});

// Create thread model from definbed schema and export.
module.exports = mongoose.model('Thread', threadSchema);
