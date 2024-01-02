import bcrypt from 'bcrypt';

export class PasswordManager {
  static async toHash(password: string) {
    const toHash = await bcrypt.hash(password, 10);
    return toHash;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const isPassword = await bcrypt.compare(suppliedPassword, storedPassword);
    return isPassword;
  }
}
