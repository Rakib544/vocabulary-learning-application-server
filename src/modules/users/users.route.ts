import { Router } from 'express';

import UserController from './users.controller';

import { verifyAdmin, verifyAuthToken } from '@/middlewares/auth';
import RequestValidator from '@/middlewares/request-validator';

const users: Router = Router();
const userController = new UserController();

/**
 * Create user body
 * @typedef {object} CreateUserBody
 * @property {string} email.required - email of user
 * @property {string} name.required - name of user
 * @property {string} cognitoId.required - cognito id
 * @property {string} phone - phone number
 */
/**
 * User
 * @typedef {object} User
 * @property {string} email - email of user
 * @property {string} name - name of user
 * @property {string} cognitoId - cognito id
 * @property {string} phone - phone number
 */
/**
 * POST /users/create
 * @summary Create user
 * @tags users
 * @param {CreateUserBody} request.body.required
 * @return {User} 201 - user created
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
