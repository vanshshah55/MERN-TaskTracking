const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Name of the employee
  employeeId: { type: String, required: true, unique: true }, // Unique identifier for the employee
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the employee was added
});

module.exports = mongoose.model('Employee', EmployeeSchema);
