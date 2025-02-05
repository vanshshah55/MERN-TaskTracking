const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({
      status: 1, // "pending" first
      completionDate: -1, // Latest completed tasks first
      date: -1, // Latest tasks first within the same status
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a task
router.post('/', async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      date: new Date(req.body.date), // Convert date to Date object
      completionDate: req.body.completionDate ? new Date(req.body.completionDate) : null, // Optional
    });
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update task status and completion date
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
        completionDate: req.body.completionDate ? new Date(req.body.completionDate) : null,
      },
      { new: true } // Return the updated task
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
