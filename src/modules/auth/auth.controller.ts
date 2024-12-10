import { type User } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { type NextFunction, type Request } from 'express';

import AuthService from './auth.service';

import Api from '@/lib/api';
import { type CustomResponse } from '@/types/common.type';

export default class AuthController extends Api {
  private readonly authService = new AuthService();

  public register = async (
    req: Request,
    res: CustomResponse<User>,
    next: NextFunction
  ) => {
    try {
      const user = await this.authService.register(req.body);
      this.send(res, user, HttpStatusCode.Created, 'registerUser');
    } catch (e) {
      next(e);
    }
  };

  public login = async (
    req: Request,
    res: CustomResponse<Pick<User, 'email' | 'password'>>,
    next: NextFunction
  ) => {
    try {
      const user = await this.authService.login(req.body);
      this.send(res, user, HttpStatusCode.Ok, 'successful');
    } catch (e) {
      next(e);
    }
  };
}
