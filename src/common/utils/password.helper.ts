import { IsStrongPasswordOptions } from 'class-validator';
import * as bcrypt from 'bcryptjs';

export const strongPasswordOptions: IsStrongPasswordOptions = {
  minLength: 8,
  minLowercase: 1,
  minNumbers: 1,
  minUppercase: 1,
  minSymbols: 1,
};

export const comparePassword = async (
  password: string,
  storedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, storedPassword);
};

export const hashUserPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};
