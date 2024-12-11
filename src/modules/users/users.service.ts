import { type UserRole } from '@prisma/client';

import UserRepository from './users.repository';

import { HttpBadRequestError, HttpNotFoundError } from '@/lib/errors';

export default class UserService {
  private readonly userRepository = new UserRepository();

  public async getUsers() {
    const users = await this.userRepository.getUsers();
    return users;
  }

  public async updateRole(id: string, role: UserRole) {
    if (!['USER', 'ADMIN'].includes(role)) {
      throw new HttpBadRequestError('Invalid role provided', [
        `The role '${role}' is not valid. Valid roles are 'ADMIN', 'USER'.`,
      ]);
    }
    const user = await this.userRepository.getUser(id);
    if (!user) {
      throw new HttpNotFoundError('User not found', [
        'User does not exists with the given ID',
      ]);
    }
    return await this.userRepository.updateRole(id, role);
  }
}
