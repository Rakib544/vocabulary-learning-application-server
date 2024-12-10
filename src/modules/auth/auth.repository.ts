import { UserRole, type User } from '@prisma/client';

import prisma from '@/lib/prisma';

export default class AuthRepository {
  public async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  public async createUser(
    user: Omit<User, 'id' | 'role' | 'createdAt' | 'updatedAt'>
  ): Promise<Omit<User, 'password' | 'createdAt' | 'updatedAt'>> {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        photoUrl: user.photoUrl,
        role: UserRole.USER,
      },
      select: {
        name: true,
        id: true,
        email: true,
        photoUrl: true,
        role: true,
      },
    });
    return newUser;
  }
}
