/* eslint-disable no-eval */
import { type User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export default class Jwt {
  public generateAccessToken({ id, role }: Pick<User, 'id' | 'role'>) {
    return jwt.sign({ id, role }, process.env.ACCESS_TOKEN as string, {
      expiresIn: eval(process.env.ACCESS_TOKEN_EXPIRES_IN as string),
    });
  }

  public verifyAccessToken(token: string) {
    return jwt.verify(token, process.env.ACCESS_TOKEN as string);
  }

  public generateRefreshToken(id: string) {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN as string, {
      expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRES_IN as string),
    });
  }

  public verifyRefreshToken(token: string) {
    return jwt.verify(token, process.env.REFRESH_TOKEN as string);
  }
}
