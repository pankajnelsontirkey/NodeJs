const express = require('express');

const User = require('../models/user');
const auth = require('../middleware/auth');

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

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
    );
    await req.user.save();
    res.status(200).send('User logged out successfully.');
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/users/logoutall', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send('User logged out of all sessions.');
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/users/me', auth, async (req, res) => res.send(req.user));

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidUpdate = updates.every(update =>
    allowedUpdates.includes(update)
  );
  console.log(isValidUpdate);

  if (!isValidUpdate) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  const { user } = req;
  try {
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
    console.log(e);

    res.status(400).send(e);
  }
});

router.delete('/users/me', auth, async (req, res) => {
  const { user } = req;

  try {
    await user.remove();
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
