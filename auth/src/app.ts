import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import cookieSession from 'cookie-session';

import { currentUserRouter } from '@Routes/currentUser';
import { signinRouter } from '@Routes/signIn';
import { signoutRouter } from '@Routes/signOut';
import { signupRouter } from '@Routes/signUp';
import { errorHandler } from '@Middlewares/error-handler';

const app = express();

app.set('trust proxy', true);

app
  .use(json())
  .use(
    cookieSession({
      signed: false,
      secure: process.env.NODE_ENV !== 'test',
    }),
  )
  .use(currentUserRouter)
  .use(signinRouter)
  .use(signoutRouter)
  .use(signupRouter)
  .use(errorHandler);

export { app };
