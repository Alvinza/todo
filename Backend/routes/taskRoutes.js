const express = require('express');
const Task = require('../models/Task');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// GET all tasks for logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve tasks' });
  }
});

// POST - Add a new task
router.post('/', protect, async (req, res) => {
  const { title } = req.body;

  // Reject tasks exceeding 140 characters
  if (title.length > 140) {
    return res.status(400).json({ message: 'Task cannot exceed 140 characters' });
  }

  try {
    const task = await Task.create({
      user: req.user.id,
      title,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add task' });
  }
});

// PUT - Update an existing task
router.put('/:id', protect, async (req, res) => {
  const { title, completed } = req.body;

  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    // Update the task
    task.title = title || task.title;
    task.completed = completed !== undefined ? completed : task.completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task' });
  }
});

// DELETE - Remove a task
router.delete('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    await task.deleteOne();
    res.json({ message: 'Task removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

module.exports = router;
