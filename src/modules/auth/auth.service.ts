import { type User } from '@prisma/client';

import UserRepository from '../users/users.repository';
import AuthRepository from './auth.repository';

import {
  HttpBadRequestError,
  HttpConflictError,
  HttpForbiddenError,
} from '@/lib/errors';
import Jwt from '@/lib/jwt';
import PasswordManager from '@/lib/password';

export default class AuthService {
  private readonly authRepository = new AuthRepository();
  private readonly useRepository = new UserRepository();
  private readonly passwordManager = new PasswordManager();
  private readonly jwt = new Jwt();

  public async login({ email, password }: Pick<User, 'email' | 'password'>) {
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      throw new HttpBadRequestError('Invalid email or password', [
        'The email or password you have provided is incorrect',
      ]);
    }

    const { id, name, photoUrl, role } = user;

    const isPasswordMatched = await this.passwordManager.verifyPassword(
      password,
      user.password
    );

    if (!isPasswordMatched) {
      throw new HttpBadRequestError('Invalid email or password', [
        'The email or password you have provided is incorrect',
      ]);
    }

    const accessToken = this.jwt.generateAccessToken({
      id,
      role,
    });
    const refreshToken = this.jwt.generateRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
      id,
      role,
      name,
      email,
      photoUrl,
    };
  }

  public async register({
    email,
    password,
    name,
    photoUrl,
  }: Omit<User, 'role' | 'id'>) {
    const user = await this.authRepository.findUserByEmail(email);

    if (user) {
      throw new HttpConflictError('Email already exists', [
        'The email address is already registered',
      ]);
    }

    const hashedPassword = await this.passwordManager.hashPassword(password);

    const newUser = await this.authRepository.createUser({
      name,
      email,
      password: hashedPassword,
      photoUrl,
    });

    const accessToken = this.jwt.generateAccessToken({
      id: newUser.id,
      role: newUser.role,
    });
    const refreshToken = this.jwt.generateRefreshToken(newUser.id);

    return {
      accessToken,
      refreshToken,
      ...newUser,
    };
  }

  public async generateRefreshToken(token: string) {
    try {
      const { id } = this.jwt.verifyRefreshToken(token) as { id: string };
      const user = await this.useRepository.getUser(id);
      if (!user) {
        throw new HttpForbiddenError('Invalid refresh token');
      }
      const accessToken = this.jwt.generateAccessToken({ id, role: user.role });
      const refreshToken = this.jwt.generateRefreshToken(id);
      return {
        accessToken,
        refreshToken,
      };
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        throw new HttpForbiddenError('Refresh token has expired');
      }
      throw new HttpForbiddenError('Invalid refresh token');
    }
  }
}
