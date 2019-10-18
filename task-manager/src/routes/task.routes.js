const express = require('express');

const Task = require('../models/task');

const router = new express.Router();

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/tasks/:id', async (req, res) => {
  const { id: _id } = req.params;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      res.status(404).send('The task was not found!');
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/tasks/:id', async (req, res) => {
  const incomingUpdates = Object.keys(req.body);
  const allowedUpdates = ['title', 'completed'];
  const isValidUpdate = incomingUpdates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: 'Invalid update!' });
  }

  const { id: _id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true
    });
    if (!task) {
      return res.status(404).send('User not found!');
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/tasks/:id', async (req, res) => {
  const { id: _id } = req.params;

  try {
    const taskDeleted = await Task.findByIdAndDelete(_id);
    if (!taskDeleted) {
      return res.status(404).send('Task with given id not found!');
    }
    res.send(taskDeleted);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
