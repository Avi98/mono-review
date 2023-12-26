import { hash, compare } from 'bcryptjs';

export async function hashPassword(text: string): Promise<string> {
  return await hash(text, 13);
}

export async function verifyPassword(rawPassword: string, hash: string) {
  return await compare(rawPassword, hash);
}
