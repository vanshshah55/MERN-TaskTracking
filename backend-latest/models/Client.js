const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Name of the client
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the client was added
});

module.exports = mongoose.model('Client', ClientSchema);
