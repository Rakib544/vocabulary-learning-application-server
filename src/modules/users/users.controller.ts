import { type User } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { type NextFunction, type Request } from 'express';

import UserService from './users.service';

import Api from '@/lib/api';
import { type CustomResponse } from '@/types/common.type';

export default class UserController extends Api {
  private readonly userService = new UserService();

  public createUser = async (
    req: Request,
    res: CustomResponse<User>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.createUser(req.body);
      this.send(res, user, HttpStatusCode.Created, 'createUser');
    } catch (e) {
      next(e);
    }
  };
}
