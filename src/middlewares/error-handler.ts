import { HttpStatusCode } from 'axios';
import { type NextFunction, type Request, type Response } from 'express';
import util from 'util';

import environment from '@/lib/environment';
import { type ApiError } from '@/lib/errors';
import logger from '@/lib/logger';

interface ErrorBody {
  success: false;
  message: string;
  errors?: string[];
  stack?: string;
}

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`Request Error:
        \nError:\n${JSON.stringify(err)}
        \nHeaders:\n${util.inspect(req.headers)}
        \nParams:\n${util.inspect(req.params)}
        \nQuery:\n${util.inspect(req.query)}
        \nBody:\n${util.inspect(req.body)}`);

  const status: number = err.statusCode ?? HttpStatusCode.InternalServerError;
  const errorBody: ErrorBody = {
    success: false,
    message: err.message,
    errors: err.errors,
  };

  if (environment.isDev()) {
    errorBody.stack = err.stack;
  }

  res.status(status).send(errorBody);
};

export default errorHandler;
