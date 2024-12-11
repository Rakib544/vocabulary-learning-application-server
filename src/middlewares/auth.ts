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
      next(new HttpUnAuthorizedError('Unauthorized'));
    }
    const user = jwt.verifyAccessToken(token as string);
    if (user) {
      (req as any).user = user;
      next();
    } else {
      next(new HttpForbiddenError('Forbidden: Invalid token'));
    }
  } catch (e) {
    next(new HttpForbiddenError('Forbidden: Invalid token'));
  }
};

export const verifyAdmin = async (
  req: Request & { user: { role: string } },
  res: Response,
  next: NextFunction
) => {
  const isAdmin = req?.user?.role === UserRole.ADMIN;
  if (!isAdmin) {
    next(new HttpUnAuthorizedError('You do not have the permission to access'));
  }
  next();
};
