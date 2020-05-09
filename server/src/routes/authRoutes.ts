import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';

import { User } from '../models/User';
import { PasswordManager } from '../services/passwordManager';
import { validateRequest } from '../middlewares/validateRequest';
import { BadRequestError } from '../errors/badRequestError';

const router = express.Router();

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = new User({ email, password });
    await user.save();

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY_YOLO');

    res.send({ token });
  }
);

router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage
  ],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).send({ error: 'Invalid password or email' });
    }

    // try {
    //   await user.comparePassword(password);
    //   const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY_YOLO');
    //   res.send({ token });
    // } catch (err) {
    //   res.status(422).send({ error: 'Invalid password or email' });
    // }

    const passwordsMatch = await PasswordManager.compare();
  }
);

export default router;
