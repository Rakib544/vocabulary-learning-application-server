import { type User } from '@prisma/client';

import LogMessage from '@/decorators/log-message.decorator';
import prisma from '@/lib/prisma';

export default class UserService {
  @LogMessage<[User]>({ message: 'test-decorator' })
  public async createUser(data: User) {
    const user = await prisma.user.create({ data });
    return user;
  }
}
