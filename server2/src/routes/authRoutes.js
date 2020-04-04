import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import requireAuth from '../middlewares/requireAuth';

const router = express.Router();

router.get('/current_user', (req, res) => {
  console.log(req.user);
  res.send(req.user);
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    // Verify if user already exists
    try {
      await user.save();
    } catch (err) {
      return res.status(422).send('Email already exists');
    }

    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY_YOLO');
    res.send(token);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }

  // Apparently everything is OK, let's compare passwords
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY_YOLO');
  } catch (err) {
    res.status(422).send({ error: 'Invalid password or email' });
  }
});

export default router;
