const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find().sort({ status: 1, date: 1 });
  res.json(tasks);
});

// Add a task
router.post('/', async (req, res) => {
  const task = new Task({
    ...req.body,
    date: new Date(req.body.date),  // Convert date to Date object
    completionDate: req.body.completionDate ? new Date(req.body.completionDate) : null, // Optional
  });
  await task.save();
  res.json(task);
});

// Update task status
// Update task status and completion date
router.put('/:id', async (req, res) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
          completionDate: req.body.completionDate ? new Date(req.body.completionDate) : null,
        },
        { new: true }
      );
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  

// Delete a task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;
