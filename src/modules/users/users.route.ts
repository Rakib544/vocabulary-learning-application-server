import { Router } from 'express';

import UserController from './users.controller';

import { verifyAdmin, verifyAuthToken } from '@/middlewares/auth';
import RequestValidator from '@/middlewares/request-validator';

const users: Router = Router();
const userController = new UserController();

/**
 * Login request body
 * @typedef {object} LoginBody
 * @property {string} email.required - User's email - Must be a valid email address
 * @property {string} password.required - User's password - Minimum 6 characters
 */
/**
 * Validation error response
 * @typedef {object} ValidationErrorResponse
 * @property {boolean} success - Indicates if the operation was successful (always false)
 * @property {string} message - Error message ("Request validation failed")
 * @property {string[]} errors - Array of validation error messages
 */
/**
 * Invalid credentials response
 * @typedef {object} InvalidCredentialsResponse
 * @property {boolean} success - Indicates if the operation was successful (always false)
 * @property {string} message - Error message ("Invalid email or password")
 * @property {string[]} errors - Array of error messages related to credentials
 */
/**
 * Login success response
 * @typedef {object} LoginSuccessResponse
 * @property {boolean} success - Indicates if the operation was successful (always true)
 * @property {string} message - Success message ("Login successful")
 * @property {object} data - Contains user data and tokens
 * @property {string} data.accessToken - JWT access token
 * @property {string} data.refreshToken - JWT refresh token
 * @property {string} data.id - User's ID
 * @property {string} data.role - User's role (e.g., "ADMIN")
 * @property {string} data.name - User's name
 * @property {string} data.photoUrl - URL to the user's profile picture
 */
/**
 * POST /auth/login
 * @summary User login
 * @tags auth
 * @param {LoginBody} request.body.required - User credentials
 * @return {LoginSuccessResponse} 200 - Login successful
 * @return {ValidationErrorResponse} 400 - Request validation failed
 * @return {InvalidCredentialsResponse} 401 - Invalid email or password
 */

users.get('/', verifyAuthToken, verifyAdmin, userController.getUsers);
users.put(
  '/:id/role',
  verifyAuthToken,
  verifyAdmin,
  RequestValidator.isValidObjectId(),
  userController.updateRole
);

export default users;
