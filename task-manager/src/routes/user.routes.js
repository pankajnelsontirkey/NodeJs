const express = require('express');

const User = require('../models/user');

const router = new express.Router();

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    if (!user) {
      return res.status(404).send('User not found!');
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send('Server error!', e);
  }
});

router.get('/users/:id', async (req, res) => {
  const { id: _id } = req.params;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidUpdate = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  const { id: _id } = req.params;
  try {
    const user = await User.findById(_id);
    updates.forEach(update => (user[update] = req.body[update]));
    await user.save();

    /* const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true
    }); */
    if (!user) {
      return res.status(404).send('User was not found!');
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/users/:id', async (req, res) => {
  const { id: _id } = req.params;

  try {
    const userDeleted = await User.findByIdAndDelete(_id);
    if (!userDeleted) {
      return res.status(404).send({ error: 'User with given id not found!' });
    }
    res.send(userDeleted);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
