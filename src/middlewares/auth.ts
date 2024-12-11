import { UserRole } from '@prisma/client';
import { type NextFunction, type Request, type Response } from 'express';

import { HttpForbiddenError, HttpUnAuthorizedError } from '@/lib/errors';
import Jwt from '@/lib/jwt';

const jwt = new Jwt();

export const verifyAuthToken = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      next(new HttpUnAuthorizedError('Authentication token is required'));
    }
    const user = jwt.verifyAccessToken(token as string);
    (req as any).user = user;
    next();
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      next(new HttpUnAuthorizedError('Authentication token has expired'));
      return;
    }
    next(new HttpForbiddenError('Invalid authentication token'));
  }
};

export const verifyAdmin = async (
  req: Request & { user: { role: string } },
  _: Response,
  next: NextFunction
) => {
  const isAdmin = req?.user?.role === UserRole.ADMIN;
  if (!isAdmin) {
    next(new HttpUnAuthorizedError('Access denied'));
  }
  next();
};
