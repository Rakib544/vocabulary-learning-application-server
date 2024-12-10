import bcrypt from 'bcrypt';

export default class PasswordManager {
  public async hashPassword(password: string) {
    const saltRounds = 11;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }

  public async verifyPassword(expected: string, actual: string) {
    return await bcrypt.compare(expected, actual);
  }
}
