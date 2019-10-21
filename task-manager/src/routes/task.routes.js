const express = require('express');

const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({ ...req.body, author: req.user._id });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ author: req.user._id });
    if (!tasks.length) {
      return res.status(404).send({ error: 'No tasks were found!' });
    }
    res.status(200).send(tasks);

    /* await req.user.populate('tasks').execPopulate();
    if (!req.user.tasks.length) {
      return res.status(404).send({ error: 'No tasks were found!' });
    }
    res.send(req.user.tasks); */
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/tasks/:id', auth, async (req, res) => {
  const { id: _id } = req.params;
  try {
    const task = await Task.findOne({ _id, author: req.user._id });
    if (!task) {
      return res.status(404).send({ error: 'The task was not found!' });
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'completed'];
  const isValidUpdate = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: 'Invalid update!' });
  }

  const { id: _id } = req.params;
  try {
    const task = await Task.findById(_id);
    updates.forEach(update => (task[update] = req.body[update]));
    await task.save();

    if (!task) {
      return res.status(404).send('Task not found!');
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const taskDeleted = await Task.findByIdAndDelete({
      _id: req.params.id,
      author: req.user._id
    });
    if (!taskDeleted) {
      return res.status(404).send('Task with given id not found!');
    }
    res.send(taskDeleted);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
