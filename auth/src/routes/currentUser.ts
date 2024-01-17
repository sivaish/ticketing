import express, { Request, Response } from 'express';

import { currentUser } from '@g-tix/common';

interface AuthenticatedRequest extends Request {
  currentUser?: { id: string; email: string };
}

const router = express.Router();

router.get(
  '/api/users/currentuser',
  currentUser,
  // requireAuth,
  (req: AuthenticatedRequest, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  },
);

export { router as currentUserRouter };
