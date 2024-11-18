const mongoose = require('mongoose');
// Build Task Schemas
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
});

module.exports = mongoose.model('Task', TaskSchema);