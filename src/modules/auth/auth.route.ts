import { Router } from 'express';

import AuthController from './auth.controller';

import { LoginUserDto, RegisterUserDto } from '@/dto/auth.dto';
import RequestValidator from '@/middlewares/request-validator';

const auth: Router = Router();
const authController = new AuthController();

/**
 * Login request body
 * @typedef {object} LoginBody
 * @property {string} email.required - User's email
 * @property {string} password.required - User's password
 */
/**
 * Login response
 * @typedef {object} LoginResponse
 * @property {string} token - JWT token for authentication
 * @property {string} message - Login success message
 */
/**
 * POST /auth/login
 * @summary User login
 * @tags auth
 * @param {LoginBody} request.body.required - User credentials
 * @return {LoginResponse} 200 - Login successful
 * @return {object} 401 - Unauthorized - Invalid email or password
 */

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

auth.post('/refresh', authController.generateFreshToken);

export default auth;
