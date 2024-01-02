import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

interface AuthenticatedRequest extends Request {
  currentUser?: UserPayload;
}

export const currentUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session?.jwt) {
    next();
    return;
  }

  try {
    const payLoad = jwt.verify(
      req.session?.jwt,
      process.env.JWT_KEY!,
    ) as UserPayload;
    req.currentUser = payLoad;
  } catch (err) {
    console.error('Error verifying JWT: ', err);
  }

  next();
};
