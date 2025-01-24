
const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    client: { type: String, required: true },
    issue: { type: String, required: true },
    employee: { type: String, required: true },
    status: { type: String, default: 'pending' },
    billing: { type: String, required: true },
    completionDate: { type: Date, required: false },
  });
  
  module.exports = mongoose.model('Task', TaskSchema);
  


