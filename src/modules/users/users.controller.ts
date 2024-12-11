import { type User } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { type NextFunction, type Request } from 'express';

import UserService from './users.service';

import Api from '@/lib/api';
import { type CustomResponse } from '@/types/common.type';

export default class UserController extends Api {
  private readonly userService = new UserService();

  public getUsers = async (
    _,
    res: CustomResponse<User>,
    next: NextFunction
  ) => {
    try {
      const users = await this.userService.getUsers();
      this.send(res, users, HttpStatusCode.Ok, 'getUsers');
    } catch (e) {
      next(e);
    }
  };

  public updateRole = async (
    req: Request,
    res: CustomResponse<User>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const user = await this.userService.updateRole(id, req.body.role);
      this.send(res, user, HttpStatusCode.Ok, 'Users updated successfully');
    } catch (e) {
      next(e);
    }
  };
}
