import { type ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { type NextFunction, type Request, type Response } from 'express';

import { HttpBadRequestError } from '@/lib/errors';
import logger from '@/lib/logger';

export default class RequestValidator {
  static validate = <T>(classInstance: ClassConstructor<T>) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
      const validationErrorText = 'Request validation failed!';
      try {
        const convertedObject = plainToInstance(classInstance, req.body);
        const errors = await validate(
          convertedObject as Record<string, unknown>
        );

        if (!errors.length) {
          next();
          return;
        }
        const rawErrors: string[] = [
          ...new Set([
            ...errors.flatMap((error) =>
              Object.values(error.constraints ?? [])
            ),
          ]),
        ];
        logger.error(rawErrors);
        next(new HttpBadRequestError(validationErrorText, rawErrors));
      } catch (e) {
        logger.error(e);
        next(new HttpBadRequestError(validationErrorText, [e.message]));
      }
    };
  };

  static isValidObjectId = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params.id;
        const isValid = /^[0-9a-fA-F]{24}$/.test(id);
        if (!isValid) {
          next(new HttpBadRequestError('Invalid ObjectId', []));
        }
        next();
      } catch (e) {
        next(new HttpBadRequestError('Invalid ObjectId', []));
      }
    };
  };
}
