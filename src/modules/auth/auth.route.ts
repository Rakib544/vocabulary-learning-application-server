import { Router } from 'express';

import AuthController from './auth.controller';

import { LoginUserDto, RegisterUserDto } from '@/dto/auth.dto';
import RequestValidator from '@/middlewares/request-validator';

const auth: Router = Router();
const authController = new AuthController();

auth.post(
  '/register',
  RequestValidator.validate(RegisterUserDto),
  authController.register
);
auth.post(
  '/login',
  RequestValidator.validate(LoginUserDto),
  authController.login
);

export default auth;
