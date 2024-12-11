import { type UserRole } from '@prisma/client';

import prisma from '@/lib/prisma';

export default class UserRepository {
  public async getUsers() {
    return await prisma.user.findMany({
      select: { name: true, id: true, email: true, role: true },
    });
  }

  public async getUser(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }

  public async updateRole(id: string, role: UserRole) {
    return await prisma.user.update({ where: { id }, data: { role } });
  }
}
