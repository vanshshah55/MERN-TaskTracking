const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// Get all clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find().sort({ name: 1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a client
router.post('/', async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a client
router.delete('/:id', async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
