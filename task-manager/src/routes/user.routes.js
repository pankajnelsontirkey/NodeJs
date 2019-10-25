const express = require('express');
const multer = require('multer');
const sharp = require('sharp');

const User = require('../models/user');
const auth = require('../middleware/auth');
const { sendWelcomeEmail, sendCancellationEmail } = require('../mails/account');

const router = new express.Router();
const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    /* 
    Error - cb(new Error('error message'))
    File expected - cb(undefined, true)
    Silently reject - cb(undefined, false)
    */
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image file'));
    }
    cb(undefined, true);
  }
});

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    // sendWelcomeEmail(user.email, user.name);
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

router.post(
  '/users/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .png()
      .resize({ width: 250, height: 250 })
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get('/users/me', auth, async (req, res) => res.send(req.user));

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidUpdate = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  const { user } = req;
  try {
    updates.forEach(update => (user[update] = req.body[update]));
    await user.save();

    if (!user) {
      return res.status(404).send('User was not found!');
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/users/me', auth, async (req, res) => {
  const { user } = req;

  try {
    await user.remove();
    // sendCancellationEmail(user.email, user.name);
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/users/me/avatar', auth, async (req, res) => {
  try {
    const { user } = req;
    user.avatar = undefined;
    await user.save();

    res.send('User avatar was deleted.');
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get(
  '/users/:id/avatar',
  /* auth, */ async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user || !user.avatar) {
        throw new Error({ message: 'User/avatar not found!' });
      }
      res.set('Content-Type', 'image/png');
      res.send(user.avatar);
    } catch (e) {
      res.status(404).send();
    }
  }
);
module.exports = router;
