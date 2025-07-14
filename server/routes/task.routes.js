import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import Task from '../models/Task.js';

const router = express.Router();

// Create a task
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, project, assignedTo, dueDate } = req.body;
    const task = new Task({
      title,
      description,
      project,
      assignedTo,
      dueDate,
      createdBy: req.user.id
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all tasks (optionally filter by project)
router.get('/', protect, async (req, res) => {
  try {
    const query = {};
    if (req.query.project) query.project = req.query.project;

    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email')
      .populate('project', 'name');

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update task (e.g., move status or assign user)
router.put('/:id', protect, async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete task
router.delete('/:id', protect, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
