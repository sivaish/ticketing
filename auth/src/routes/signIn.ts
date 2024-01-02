import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { PasswordManager } from '@Services/passwordManager';
import { User } from '@Models/user';

import { validateRequest } from '@Middlewares/validate-request';
import { BadRequestError } from '@Errors/bad-request-error';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordMatch = await PasswordManager.compare(
      existingUser.password,
      password,
    );

    if (!passwordMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    // Generate JWT
    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!,
    );

    // Store it on the session object
    req.session = {
      jwt: userJwt,
    };

    return res.status(200).send(existingUser);
  },
);

export { router as signinRouter };
