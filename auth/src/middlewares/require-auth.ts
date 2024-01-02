import { Request, Response, NextFunction } from 'express';

import { NotAuthorizedError } from '@Errors/not-authorized';

interface AuthenticatedRequest extends Request {
  currentUser?: { id: string; email: string };
}

export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
